import React, { useState } from "react";
import { View, Text } from "@tarojs/components";
import Tabs, { TabPane } from "../../components/Tabs";
import Tag from "../../components/Tag";
import Button from "../../components/Button";
import { useTheme } from "../../hooks/useTheme";

function Messages() {
  const { themeColors } = useTheme()
  const [activeTab, setActiveTab] = useState("0");

  const [recycleMessages] = useState([
    {
      id: 1,
      title: "回收成功",
      content: "您在万达广场回收点投递的1.5kg纸类垃圾已成功回收，获得45积分",
      time: "2024-01-15 14:35",
      type: "success",
      read: false,
    },
    {
      id: 2,
      title: "积分到账",
      content: "您的60积分已到账，当前总积分1250分",
      time: "2024-01-15 10:20",
      type: "points",
      read: true,
    },
    {
      id: 3,
      title: "回收异常",
      content: "您在地铁站出口的投递出现异常，请联系客服处理",
      time: "2024-01-14 16:45",
      type: "error",
      read: false,
    },
  ]);

  const [activityMessages] = useState([
    {
      id: 1,
      title: "积分双倍日活动",
      content: "本周末(1月20-21日)投递垃圾可获得双倍积分，快来参与吧！",
      time: "2024-01-15 09:00",
      type: "activity",
      read: false,
    },
    {
      id: 2,
      title: "新年环保挑战",
      content: "参与新年环保挑战，连续7天投递垃圾可获得500积分奖励",
      time: "2024-01-10 10:00",
      type: "challenge",
      read: true,
    },
    {
      id: 3,
      title: "地球日特别活动",
      content: "4月22日地球日，所有用户投递垃圾可获得额外环保徽章",
      time: "2024-01-05 14:30",
      type: "special",
      read: true,
    },
  ]);

  const [systemMessages] = useState([
    {
      id: 1,
      title: "系统维护通知",
      content: "系统将于今晚23:00-01:00进行维护升级，期间可能影响使用",
      time: "2024-01-15 18:00",
      type: "maintenance",
      read: false,
    },
    {
      id: 2,
      title: "版本更新",
      content: "小程序已更新至v1.2.0，新增垃圾分类AI识别功能",
      time: "2024-01-12 12:00",
      type: "update",
      read: true,
    },
    {
      id: 3,
      title: "隐私政策更新",
      content: "我们更新了隐私政策，请查看最新条款",
      time: "2024-01-08 15:20",
      type: "policy",
      read: true,
    },
  ]);

  const getMessageIcon = (type) => {
    const icons = {
      success: "✅",
      points: "💰",
      error: "❌",
      activity: "🎉",
      challenge: "🏆",
      special: "🌟",
      maintenance: "🔧",
      update: "📱",
      policy: "📋",
    };
    return icons[type] || "📢";
  };

  const getMessageTypeColor = (type) => {
    const colors = {
      success: "success",
      points: "warning",
      error: "danger",
      activity: "primary",
      challenge: "success",
      special: "warning",
      maintenance: "info",
      update: "primary",
      policy: "default",
    };
    return colors[type] || "default";
  };

  const renderMessageList = (messages) => {
    return messages.map((message) => (
      <View
        key={message.id}
        className={`bg-white rounded-lg p-4 mb-3 relative transition-all ${
          !message.read ? "border-l-4" : ""
        }`}
        style={!message.read ? {
          borderLeftColor: themeColors.success,
          backgroundColor: themeColors.successBg
        } : {}}
      >
        <View className="mb-2">
          <View className="flex items-center flex-1">
            <Text className="text-16 mr-8">{getMessageIcon(message.type)}</Text>
            <Text className="text-14 font-bold text-gray-800 flex-1">
              {message.title}
            </Text>
            {!message.read && (
              <View 
                className="w-8 h-8 rounded-full ml-8"
                style={{ backgroundColor: themeColors.error }}
              />
            )}
          </View>
          <Tag
            type={getMessageTypeColor(message.type)}
            size="small"
            className="mt-8"
          >
            {message.type}
          </Tag>
        </View>
        <Text className="text-12 text-gray-600 leading-relaxed block mb-8">
          {message.content}
        </Text>
        <Text className="text-12 text-gray-500">{message.time}</Text>
      </View>
    ));
  };

  const handleMarkAllRead = () => {
    // 标记所有消息为已读的逻辑
    console.log("标记所有消息为已读");
  };

  const handleClearAll = () => {
    // 清空所有消息的逻辑
    console.log("清空所有消息");
  };

  return (
    <View className="min-h-screen bg-gray-50">
      {/* 操作按钮 */}
      <View className="flex justify-end gap-12 p-16 bg-white border-b border-gray-100">
        <Button
          size="small"
          className="px-12 py-4 text-12"
          onClick={handleMarkAllRead}
        >
          全部已读
        </Button>
        <Button
          size="small"
          className="px-12 py-4 text-12 bg-gray-100 text-gray-600"
          onClick={handleClearAll}
        >
          清空消息
        </Button>
      </View>

      {/* 消息标签页 */}
      <Tabs value={activeTab} onChange={setActiveTab}>
        <TabPane
          title={`回收记录(${recycleMessages.filter((m) => !m.read).length})`}
        >
          <View className="p-20">{renderMessageList(recycleMessages)}</View>
        </TabPane>

        <TabPane
          title={`活动通知(${activityMessages.filter((m) => !m.read).length})`}
        >
          <View className="p-20">{renderMessageList(activityMessages)}</View>
        </TabPane>

        <TabPane
          title={`系统消息(${systemMessages.filter((m) => !m.read).length})`}
        >
          <View className="p-20">{renderMessageList(systemMessages)}</View>
        </TabPane>
      </Tabs>
    </View>
  );
}

export default Messages;
