import React, { useState } from 'react'
import { View } from '@tarojs/components'
import './index.scss'

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
    <View className={`custom-tabs ${className}`} {...props}>
      <View className="custom-tabs__header">
        {tabs.map((tab, index) => (
          <View
            key={index}
            className={`custom-tabs__tab ${activeTab === index.toString() ? 'custom-tabs__tab--active' : ''}`}
            onClick={() => handleTabChange(index.toString())}
          >
            {tab.props.title}
          </View>
        ))}
      </View>
      <View className="custom-tabs__content">
        {tabs.map((tab, index) => (
          <View
            key={index}
            className={`custom-tabs__pane ${activeTab === index.toString() ? 'custom-tabs__pane--active' : ''}`}
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