import React, { useState } from 'react'
import { View } from '@tarojs/components'

function Tabs({ 
  value = '0',
  onChange,
  className = '',
  children,
  ...props 
}) {
  const [activeTab, setActiveTab] = useState(value)

  const handleTabChange = (tabValue) => {
    setActiveTab(tabValue)
    onChange && onChange(tabValue)
  }

  const tabs = React.Children.toArray(children)

  return (
    <View className={className} {...props}>
      <View className="flex bg-theme-bg-light border-b border-theme-border sticky top-0 z-10">
        {tabs.map((tab, index) => (
          <View
            key={index}
            className={`flex-1 p-12 px-16 text-center text-14 cursor-pointer transition-all relative ${
              activeTab === index.toString() 
                ? 'text-theme-primary font-medium' 
                : 'text-theme-text-secondary hover:text-theme-primary'
            }`}
            onClick={() => handleTabChange(index.toString())}
          >
            {tab.props.title}
            {activeTab === index.toString() && (
              <View 
                className="absolute bottom-0 left-half w-24 h-2 bg-theme-primary rounded-1"
                style={{ 
                  left: '50%',
                  transform: 'translateX(-50%)'
                }}
              />
            )}
          </View>
        ))}
      </View>
      <View className="p-16">
        {tabs.map((tab, index) => (
          <View
            key={index}
            className={activeTab === index.toString() ? 'block' : 'hidden'}
          >
            {activeTab === index.toString() && tab.props.children}
          </View>
        ))}
      </View>
    </View>
  )
}

function TabPane({ title, children }) {
  return <View>{children}</View>
}

Tabs.TabPane = TabPane

export default Tabs
export { TabPane }