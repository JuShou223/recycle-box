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
    bottom: 'w-full bg-white rounded-t-16 overflow-y-auto',
    center: 'bg-white rounded-12 m-20 max-w-320 w-full',
    top: 'w-full bg-white rounded-b-16 overflow-y-auto'
  }
  return (
    <View
      className={`fixed inset-0 bg-black z-1000 flex ${positionClasses[position]} ${className}`}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={handleMaskClick}
      {...props}
    >
      <View className={contentClasses[position]}>{children}</View>
    </View>
  );
}

export default Popup;
