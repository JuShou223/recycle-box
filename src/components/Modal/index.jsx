import React from "react";
import { View } from "@tarojs/components";
import Button from "../Button";
import "./index.scss";

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
      className={`custom-modal ${className}`}
      onClick={handleMaskClick}
      {...props}
    >
      <View className="custom-modal__content">
        {title && <View className="custom-modal__header">{title}</View>}
        <View className="custom-modal__body">{children}</View>
        <View className="custom-modal__footer">
          {showCancel && (
            <Button
              type="default"
              onClick={onCancel}
              className="custom-modal__button"
            >
              {cancelText}
            </Button>
          )}
          <Button
            type="primary"
            onClick={onConfirm}
            className="custom-modal__button"
          >
            {confirmText}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default Modal;
