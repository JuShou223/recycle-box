import React from "react";
import { View, Text } from "@tarojs/components";

function Loading({
  show = true,
  text = "加载中...",
  size = "medium",
  type = "spinner",
  className = "",
  ...props
}) {
  if (!show) return null;

  const sizeClasses = {
    small: {
      spinner: 'w-20 h-20 border-2',
      dots: 'gap-4',
      dot: 'w-6 h-6',
      pulse: 'w-20 h-20',
      text: 'text-12 mt-8'
    },
    medium: {
      spinner: 'w-32 h-32 border-3',
      dots: 'gap-4',
      dot: 'w-8 h-8',
      pulse: 'w-32 h-32',
      text: 'text-14 mt-12'
    },
    large: {
      spinner: 'w-48 h-48 border-4',
      dots: 'gap-4',
      dot: 'w-12 h-12',
      pulse: 'w-48 h-48',
      text: 'text-16 mt-16'
    }
  }

  const currentSize = sizeClasses[size]
  return (
    <View className={`flex items-center justify-center p-20 ${className}`} {...props}>
      <View className="flex flex-col items-center justify-center">
        {type === "spinner" && (
          <View className="relative">
            <View 
              className={`rounded-full border-theme-border-light border-t-theme-primary ${currentSize.spinner}`}
              style={{
                animation: 'spin 1s linear infinite'
              }}
            />
          </View>
        )}

        {type === "dots" && (
          <View className={`flex ${currentSize.dots}`}>
            <View 
              className={`rounded-full bg-theme-primary ${currentSize.dot}`}
              style={{
                animation: 'bounce 1.4s ease-in-out infinite both',
                animationDelay: '-0.32s'
              }}
            />
            <View 
              className={`rounded-full bg-theme-primary ${currentSize.dot}`}
              style={{
                animation: 'bounce 1.4s ease-in-out infinite both',
                animationDelay: '-0.16s'
              }}
            />
            <View 
              className={`rounded-full bg-theme-primary ${currentSize.dot}`}
              style={{
                animation: 'bounce 1.4s ease-in-out infinite both'
              }}
            />
          </View>
        )}

        {type === "pulse" && (
          <View>
            <View 
              className={`rounded-full bg-theme-primary ${currentSize.pulse}`}
              style={{
                animation: 'pulse 1.5s ease-in-out infinite'
              }}
            />
          </View>
        )}

        {text && <Text className={`text-theme-text-secondary text-center leading-tight ${currentSize.text}`}>{text}</Text>}
      </View>
    </View>
  );
}

// 页面级加载组件
function PageLoading({ text = "页面加载中...", ...props }) {
  return (
    <View className="fixed inset-0 bg-theme-bg-light flex items-center justify-center z-9999">
      <Loading text={text} {...props} />
    </View>
  );
}

// 内容加载组件
function ContentLoading({ text = "内容加载中...", ...props }) {
  return (
    <View className="p-40 text-center bg-theme-bg-light rounded-8">
      <Loading size="small" text={text} {...props} />
    </View>
  );
}

Loading.Page = PageLoading;
Loading.Content = ContentLoading;

export default Loading;
export { PageLoading, ContentLoading };
