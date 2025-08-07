import React from "react";
import { View } from "@tarojs/components";
import Button from "../Button";

function Modal({
  show = false,
  title,
  children,
  onConfirm,
  onCancel,
  confirmText = "确定",
  cancelText = "取消",
  showCancel = true,
  className = "",
  ...props
}) {
  if (!show) return null;

  const handleMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel && onCancel();
    }
  };

  return (
    <View
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1000 ${className}`}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={handleMaskClick}
      {...props}
    >
      <View className="bg-white rounded-12 m-20 max-w-320 w-full overflow-hidden">
        {title && <View className="p-20 pb-0 text-16 font-bold text-gray-800 text-center">{title}</View>}
        <View className="p-16 px-20 text-gray-600 text-center">{children}</View>
        <View className="flex border-t border-gray-200">
          {showCancel && (
            <Button
              type="default"
              onClick={onCancel}
              className="flex-1 rounded-0 border-0 h-48 border-r border-gray-200"
            >
              {cancelText}
            </Button>
          )}
          <Button
            type="primary"
            onClick={onConfirm}
            className="flex-1 rounded-0 border-0 h-48"
          >
            {confirmText}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default Modal;
