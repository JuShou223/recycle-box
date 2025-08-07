import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import { Card, Tabs, TabPane, Avatar, Tag } from '@nutui/nutui-react-taro'
import './index.scss'

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
      <Card key={user.rank} className={`ranking-item ${user.isMe ? 'my-rank' : ''}`}>
        <View className='rank-info'>
          <View className='rank-number' style={{ color: getRankColor(user.rank) }}>
            {getRankIcon(user.rank)}
          </View>
          <Avatar 
            size="medium"
            src={user.avatar}
            className='user-avatar'
          />
          <View className='user-info'>
            <View className='user-header'>
              <Text className='username'>{user.nickname}</Text>
              {user.isMe && <Tag type='primary' size='small'>我</Tag>}
              {user.level && (
                <Tag type='warning' size='small'>Lv.{user.level}</Tag>
              )}
            </View>
            <Text className='user-points'>{user.points}积分</Text>
          </View>
        </View>
        
        <View className='user-stats'>
          <View className='stat-item'>
            <Text className='stat-number'>{user.recycleCount}</Text>
            <Text className='stat-label'>回收次数</Text>
          </View>
          <View className='stat-item'>
            <Text className='stat-number'>{user.co2Saved}kg</Text>
            <Text className='stat-label'>减少碳排放</Text>
          </View>
        </View>
      </Card>
    ))
  }

  return (
    <View className='ranking-page'>
      {/* 页面标题 */}
      <View className='page-header'>
        <Text className='page-title'>🏆 环保达人榜</Text>
        <Text className='page-subtitle'>看看谁是最棒的环保达人</Text>
      </View>

      {/* 排行榜标签页 */}
      <Tabs value={activeTab} onChange={setActiveTab} className='ranking-tabs'>
        <TabPane title='本周排行'>
          <View className='ranking-list'>
            {renderRankingList(weeklyRanking)}
          </View>
        </TabPane>
        
        <TabPane title='本月排行'>
          <View className='ranking-list'>
            {renderRankingList(monthlyRanking)}
          </View>
        </TabPane>
        
        <TabPane title='总排行'>
          <View className='ranking-list'>
            {renderRankingList(totalRanking)}
          </View>
        </TabPane>
      </Tabs>

      {/* 排行规则说明 */}
      <Card className='ranking-rules'>
        <Text className='rules-title'>📋 排行规则</Text>
        <View className='rules-content'>
          <Text className='rule-item'>• 积分越高排名越靠前</Text>
          <Text className='rule-item'>• 每日24:00更新排行榜</Text>
          <Text className='rule-item'>• 前三名可获得专属徽章</Text>
          <Text className='rule-item'>• 月度冠军可获得额外奖励</Text>
        </View>
      </Card>
    </View>
  )
}

export default Ranking