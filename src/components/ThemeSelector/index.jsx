import React, { useState, useEffect } from "react";
import { View, Text } from "@tarojs/components";
import Popup from "../Popup";
import Button from "../Button";
import { themes, getCurrentTheme, setTheme } from "../../styles/themes";
import "./index.scss";

function ThemeSelector({ show, onClose }) {
  const [currentTheme, setCurrentTheme] = useState(getCurrentTheme());

  useEffect(() => {
    setCurrentTheme(getCurrentTheme());
  }, [show]);

  const handleThemeChange = (themeName) => {
    if (setTheme(themeName)) {
      setCurrentTheme(themeName);
      // 触发页面重新渲染
      setTimeout(() => {
        if (onClose) onClose();
      }, 300);
    }
  };

  const themeList = Object.keys(themes).map((key) => ({
    key,
    ...themes[key],
  }));

  return (
    <Popup
      show={show}
      position="bottom"
      onClose={onClose}
      className="theme-selector-popup"
    >
      <View className="theme-selector">
        <View className="selector-header">
          <Text className="selector-title">选择主题</Text>
          <Button size="small" onClick={onClose}>
            完成
          </Button>
        </View>

        <View className="theme-list">
          {themeList.map((theme) => (
            <View
              key={theme.key}
              className={`theme-item ${
                currentTheme === theme.key ? "active" : ""
              }`}
              onClick={() => handleThemeChange(theme.key)}
            >
              <View className="theme-preview">
                <View
                  className="color-primary"
                  style={{ backgroundColor: theme.primary }}
                />
                <View
                  className="color-secondary"
                  style={{ backgroundColor: theme.secondary }}
                />
                <View
                  className="color-accent"
                  style={{ backgroundColor: theme.accent }}
                />
              </View>
              <Text className="theme-name">{theme.name}</Text>
              {currentTheme === theme.key && (
                <Text className="theme-check">✓</Text>
              )}
            </View>
          ))}
        </View>
      </View>
    </Popup>
  );
}

export default ThemeSelector;
