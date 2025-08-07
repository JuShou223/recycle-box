import React, { useState, useEffect } from "react";
import { View, Text } from "@tarojs/components";
import Popup from "../Popup";
import Button from "../Button";
import { themes, getCurrentTheme, setTheme } from "../../styles/themes";

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
    >
      <View className="p-20 bg-white rounded-t-16">
        <View className="flex justify-between items-center mb-20 pb-16 border-b border-gray-100">
          <Text className="text-18 font-bold text-gray-800">选择主题</Text>
          <Button size="small" onClick={onClose}>
            完成
          </Button>
        </View>

        <View>
          {themeList.map((theme) => (
            <View
              key={theme.key}
              className={`flex items-center p-16 mb-12 bg-white border-2 rounded-12 ${
                currentTheme === theme.key 
                  ? "border-green-500 bg-green-50" 
                  : "border-gray-200"
              }`}
              onClick={() => handleThemeChange(theme.key)}
            >
              <View className="flex gap-4 mr-12">
                <View
                  className="w-20 h-20 rounded-full border-2 border-white"
                  style={{ backgroundColor: theme.primary }}
                />
                <View
                  className="w-20 h-20 rounded-full border-2 border-white"
                  style={{ backgroundColor: theme.secondary }}
                />
                <View
                  className="w-20 h-20 rounded-full border-2 border-white"
                  style={{ backgroundColor: theme.accent }}
                />
              </View>
              <Text className="flex-1 text-16 font-medium text-gray-800">{theme.name}</Text>
              {currentTheme === theme.key && (
                <Text className="text-18 text-green-500 font-bold">✓</Text>
              )}
            </View>
          ))}
        </View>
      </View>
    </Popup>
  );
}

export default ThemeSelector;
