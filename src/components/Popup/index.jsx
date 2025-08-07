import React from "react";
import { View } from "@tarojs/components";

function Popup({
  show = false,
  position = "bottom",
  onClose,
  children,
  className = "",
  ...props
}) {
  if (!show) return null;

  const handleMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose && onClose();
    }
  };

  const positionClasses = {
    bottom: 'items-end',
    center: 'items-center justify-center',
    top: 'items-start'
  }

  const contentClasses = {
    bottom: 'w-full bg-theme-bg-light rounded-t-16 max-h-80vh overflow-y-auto',
    center: 'bg-theme-bg-light rounded-12 m-20 max-w-320 w-full',
    top: 'w-full bg-theme-bg-light rounded-b-16 max-h-80vh overflow-y-auto'
  }
  return (
    <View
      className={`fixed inset-0 bg-black bg-opacity-50 z-1000 flex ${positionClasses[position]} ${className}`}
      onClick={handleMaskClick}
      {...props}
    >
      <View className={contentClasses[position]}>{children}</View>
    </View>
  );
}

export default Popup;
