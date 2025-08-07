import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import Tabs, { TabPane } from '../../components/Tabs'
import Avatar from '../../components/Avatar'
import Tag from '../../components/Tag'

function Ranking() {
  const [activeTab, setActiveTab] = useState('0')
  
  const [weeklyRanking] = useState([
    {
      rank: 1,
      nickname: '环保小达人',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      points: 450,
      recycleCount: 15,
      co2Saved: 8.5,
      isMe: false
    },
    {
      rank: 2,
      nickname: '绿色生活家',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      points: 380,
      recycleCount: 12,
      co2Saved: 6.8,
      isMe: false
    },
    {
      rank: 3,
      nickname: '地球守护者',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      points: 320,
      recycleCount: 10,
      co2Saved: 5.2,
      isMe: true
    },
    {
      rank: 4,
      nickname: '环保先锋',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      points: 280,
      recycleCount: 9,
      co2Saved: 4.6,
      isMe: false
    },
    {
      rank: 5,
      nickname: '回收达人',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      points: 250,
      recycleCount: 8,
      co2Saved: 4.1,
      isMe: false
    }
  ])

  const [monthlyRanking] = useState([
    {
      rank: 1,
      nickname: '环保王者',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      points: 1850,
      recycleCount: 62,
      co2Saved: 35.8,
      isMe: true
    },
    {
      rank: 2,
      nickname: '绿色使者',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      points: 1650,
      recycleCount: 55,
      co2Saved: 31.2,
      isMe: false
    },
    {
      rank: 3,
      nickname: '环保专家',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      points: 1420,
      recycleCount: 48,
      co2Saved: 27.6,
      isMe: false
    }
  ])

  const [totalRanking] = useState([
    {
      rank: 1,
      nickname: '环保传奇',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      points: 8650,
      recycleCount: 289,
      co2Saved: 168.5,
      level: 8,
      isMe: false
    },
    {
      rank: 2,
      nickname: '地球卫士',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      points: 6250,
      recycleCount: 208,
      co2Saved: 121.3,
      level: 6,
      isMe: true
    },
    {
      rank: 3,
      nickname: '环保大师',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      points: 5890,
      recycleCount: 196,
      co2Saved: 114.7,
      level: 6,
      isMe: false
    }
  ])

  const getRankIcon = (rank) => {
    const icons = {
      1: '🥇',
      2: '🥈', 
      3: '🥉'
    }
    return icons[rank] || `${rank}`
  }

  const getRankColor = (rank) => {
    const colors = {
      1: '#faad14',
      2: '#8c8c8c',
      3: '#d4b106'
    }
    return colors[rank] || '#666'
  }

  const renderRankingList = (ranking) => {
    return ranking.map((user) => (
      <View key={user.rank} className={`bg-white rounded-xl p-4 mb-3 transition-all ${user.isMe ? 'border-2 border-green-500 bg-gradient-to-r from-green-50 to-green-100' : 'shadow-sm'}`}>
        <View className="flex items-center mb-3">
          <View className="text-2xl font-bold w-10 text-center mr-3" style={{ color: getRankColor(user.rank) }}>
            {getRankIcon(user.rank)}
          </View>
          <Avatar 
            size="medium"
            src={user.avatar}
            className="mr-12"
          />
          <View className="flex-1">
            <View className="flex items-center gap-8 mb-4">
              <Text className="text-14 font-bold text-gray-800">{user.nickname}</Text>
              {user.isMe && <Tag type='primary' size='small'>我</Tag>}
              {user.level && (
                <Tag type='warning' size='small'>Lv.{user.level}</Tag>
              )}
            </View>
            <Text className="text-16 font-bold text-yellow-600">{user.points}积分</Text>
          </View>
        </View>
        
        <View className="flex justify-around pt-12 border-t border-gray-100">
          <View className="text-center">
            <Text className="text-16 font-bold text-green-600 block mb-2">{user.recycleCount}</Text>
            <Text className="text-12 text-gray-600">回收次数</Text>
          </View>
          <View className="text-center">
            <Text className="text-16 font-bold text-green-600 block mb-2">{user.co2Saved}kg</Text>
            <Text className="text-12 text-gray-600">减少碳排放</Text>
          </View>
        </View>
      </View>
    ))
  }

  return (
    <View className="min-h-screen bg-gray-50">
      {/* 页面标题 */}
      <View className="bg-green-500 text-white text-center py-32 px-20">
        <Text className="text-20 font-bold text-white block mb-8">🏆 环保达人榜</Text>
        <Text className="text-14 text-green-100">看看谁是最棒的环保达人</Text>
      </View>

      {/* 排行榜标签页 */}
      <View className="mx-20">
      <Tabs value={activeTab} onChange={setActiveTab}>
        <TabPane title='本周排行'>
          <View>
            {renderRankingList(weeklyRanking)}
          </View>
        </TabPane>
        
        <TabPane title='本月排行'>
          <View>
            {renderRankingList(monthlyRanking)}
          </View>
        </TabPane>
        
        <TabPane title='总排行'>
          <View>
            {renderRankingList(totalRanking)}
          </View>
        </TabPane>
      </Tabs>
      </View>

      {/* 排行规则说明 */}
      <View className="m-20 bg-yellow-50 rounded-12 p-16 border border-yellow-200">
        <Text className="text-14 font-bold text-yellow-700 block mb-12">📋 排行规则</Text>
        <View>
          <Text className="text-12 text-yellow-800 block mb-4 leading-relaxed">• 积分越高排名越靠前</Text>
          <Text className="text-12 text-yellow-800 block mb-4 leading-relaxed">• 每日24:00更新排行榜</Text>
          <Text className="text-12 text-yellow-800 block mb-4 leading-relaxed">• 前三名可获得专属徽章</Text>
          <Text className="text-12 text-yellow-800 leading-relaxed">• 月度冠军可获得额外奖励</Text>
        </View>
      </View>
    </View>
  )
}

export default Ranking
      <View key={user.rank} className={`bg-white rounded-12 p-16 mb-12 ${user.isMe ? 'border-2 border-green-500 bg-green-50' : 'shadow-sm'}`}>
        <View className="flex items-center mb-12">
          <View className="text-24 font-bold w-40 text-center mr-12" style={{ color: getRankColor(user.rank) }}>