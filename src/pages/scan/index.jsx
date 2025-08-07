import React, { useState, useEffect } from "react";
import { View, Text } from "@tarojs/components";
import Button from "../../components/Button";
import Progress from "../../components/Progress";
import Modal from "../../components/Modal";
import Taro from "@tarojs/taro";
import { useTheme } from "../../hooks/useTheme";

function Scan() {
  const { themeColors } = useTheme()
  const [scanResult, setScanResult] = useState(null);
  const [recycleBox, setRecycleBox] = useState(null);
  const [isOpening, setIsOpening] = useState(false);
  const [isWeighing, setIsWeighing] = useState(false);
  const [weight, setWeight] = useState(0);
  const [points, setPoints] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    // 获取扫码结果或回收箱ID
    const instance = Taro.getCurrentInstance();
    const { code, boxId } = instance.router.params;

    if (code) {
      setScanResult(code);
      // 模拟解析二维码获取回收箱信息
      setRecycleBox({
        id: code,
        name: "万达广场回收点",
        location: "万达广场1楼东门",
        types: ["纸类", "塑料", "金属"],
      });
    } else if (boxId) {
      setRecycleBox({
        id: boxId,
        name: "万达广场回收点",
        location: "万达广场1楼东门",
        types: ["纸类", "塑料", "金属"],
      });
    }
  }, []);

  const handleOpenBox = () => {
    setIsOpening(true);

    // 模拟开箱过程
    setTimeout(() => {
      setIsOpening(false);
      Taro.showToast({
        title: "开箱成功",
        icon: "success",
      });

      // 开始称重
      startWeighing();
    }, 2000);
  };

  const startWeighing = () => {
    setIsWeighing(true);

    // 模拟称重过程
    let currentWeight = 0;
    const interval = setInterval(() => {
      currentWeight += Math.random() * 0.3;
      setWeight(Number(currentWeight.toFixed(1)));

      if (currentWeight >= 2.5) {
        clearInterval(interval);
        finishWeighing(currentWeight);
      }
    }, 200);
  };

  const finishWeighing = (finalWeight) => {
    setIsWeighing(false);
    setWeight(Number(finalWeight.toFixed(1)));

    // 计算积分 (假设纸类2积分/kg)
    const earnedPoints = Math.floor(finalWeight * 2);
    setPoints(earnedPoints);

    setTimeout(() => {
      setShowResult(true);
    }, 1000);
  };

  const handleConfirmRecycle = () => {
    setShowResult(false);

    Taro.showToast({
      title: "回收成功",
      icon: "success",
    });

    setTimeout(() => {
      Taro.navigateBack();
    }, 1500);
  };

  const handleScanAgain = () => {
    Taro.scanCode({
      success: (res) => {
        setScanResult(res.result);
        setRecycleBox({
          id: res.result,
          name: "万达广场回收点",
          location: "万达广场1楼东门",
          types: ["纸类", "塑料", "金属"],
        });
      },
    });
  };

  if (!recycleBox) {
    return (
      <View className="min-h-screen bg-gray-50 p-5">
        <View className="text-center py-10 px-5 bg-white rounded-2xl shadow-sm">
          <Text className="text-lg font-bold text-gray-800 block mb-3">
            请扫描回收箱二维码
          </Text>
          <Text className="text-sm text-gray-600 block mb-6 leading-relaxed">
            将摄像头对准回收箱上的二维码进行扫描
          </Text>
          <Button
            type="primary"
            className="w-50 h-12 rounded-3xl text-base font-bold"
            onClick={handleScanAgain}
          >
            📱 开始扫码
          </Button>
        </View>
      </View>
    );
  }

  return (
    <View className="min-h-screen bg-gray-50 p-20">
      {/* 回收箱信息 */}
      <View className="bg-white rounded-12 p-16 mb-20 shadow-sm">
        <Text className="text-18 font-bold text-gray-800 block mb-8">
          {recycleBox.name}
        </Text>
        <Text className="text-14 text-gray-600 block mb-4">
          📍 {recycleBox.location}
        </Text>
        <Text className="text-12 text-gray-500 block mb-12">
          设备ID: {recycleBox.id}
        </Text>
        <View className="flex items-center flex-wrap gap-8">
          <Text className="text-12 text-gray-600">支持类型:</Text>
          {recycleBox.types.map((type, index) => (
            <Text
              key={index}
              className="bg-blue-100 text-blue-600 text-12 px-8 py-4 rounded-4"
            >
              {type}
            </Text>
          ))}
        </View>
      </View>

      {/* 操作状态 */}
      <View className="bg-white rounded-12 p-20 mb-20 shadow-sm">
        {!isOpening && !isWeighing && weight === 0 && (
          <View className="text-center py-20">
            <Text className="text-16 font-bold text-gray-800 block mb-8">
              准备投递
            </Text>
            <Text className="text-14 text-gray-600 block mb-20">
              请确认垃圾分类正确后点击开箱
            </Text>
            <Button
              type="primary"
              className="w-200 h-48 rounded-full text-16 font-bold"
              onClick={handleOpenBox}
            >
              🔓 开箱投递
            </Button>
          </View>
        )}

        {isOpening && (
          <View className="text-center py-32">
            <Text 
              className="text-16 font-bold block mb-20"
              style={{ color: themeColors.success }}
            >
              正在开箱...
            </Text>
            <Progress percentage={100} strokeWidth={8} strokeColor={themeColors.success} />
            <Text className="text-14 text-gray-600 mt-20">
              请稍候，回收箱正在开启
            </Text>
          </View>
        )}

        {isWeighing && (
          <View className="text-center py-32">
            <Text 
              className="text-16 font-bold block mb-16"
              style={{ color: themeColors.info }}
            >
              正在称重...
            </Text>
            <Text 
              className="text-36 font-bold block mb-16"
              style={{ color: themeColors.success }}
            >
              {weight} kg
            </Text>
            <Text className="text-14 text-gray-600">
              请投入垃圾，系统正在自动称重
            </Text>
          </View>
        )}

        {!isWeighing && weight > 0 && !showResult && (
          <View className="text-center py-32">
            <Text className="text-16 font-bold text-gray-800 block mb-16">
              称重完成
            </Text>
            <Text 
              className="text-30 font-bold block mb-8"
              style={{ color: themeColors.success }}
            >
              {weight} kg
            </Text>
            <Text 
              className="text-16 font-bold"
              style={{ color: themeColors.warning }}
            >
              预计获得 {points} 积分
            </Text>
          </View>
        )}
      </View>

      {/* 垃圾分类提示 */}
      <View className="bg-yellow-50 rounded-12 p-16 border border-yellow-200">
        <Text className="text-14 font-bold text-yellow-700 block mb-12">
          💡 分类提示
        </Text>
        <View>
          <Text className="text-12 text-yellow-800 block mb-6 leading-relaxed">
            📄 纸类: 报纸、杂志、纸箱、办公用纸
          </Text>
          <Text className="text-12 text-yellow-800 block mb-6 leading-relaxed">
            🥤 塑料: 塑料瓶、塑料袋、塑料盒
          </Text>
          <Text className="text-12 text-yellow-800 leading-relaxed">
            🥫 金属: 易拉罐、金属盒、废铁
          </Text>
        </View>
      </View>

      {/* 回收结果弹窗 */}
      <Modal
        show={showResult}
        title="回收成功"
        onConfirm={handleConfirmRecycle}
        onCancel={() => setShowResult(false)}
      >
        <View className="text-center py-20">
          <Text className="text-16 font-bold text-green-600 block mb-8">
            重量: {weight} kg
          </Text>
          <Text className="text-16 font-bold text-yellow-600 block mb-16">
            获得积分: {points} 分
          </Text>
          <Text className="text-14 text-gray-600">
            感谢您为环保做出的贡献！
          </Text>
        </View>
      </Modal>
    </View>
  );
}

export default Scan;