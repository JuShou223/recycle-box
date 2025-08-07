/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 使用现有主题系统的颜色
        'theme-primary': 'var(--theme-primary)',
        'theme-primary-light': 'var(--theme-primaryLight)',
        'theme-primary-dark': 'var(--theme-primaryDark)',
        'theme-secondary': 'var(--theme-secondary)',
        'theme-secondary-light': 'var(--theme-secondaryLight)',
        'theme-secondary-dark': 'var(--theme-secondaryDark)',
        'theme-accent': 'var(--theme-accent)',
        'theme-accent-light': 'var(--theme-accentLight)',
        'theme-accent-dark': 'var(--theme-accentDark)',
        'theme-success': 'var(--theme-success)',
        'theme-warning': 'var(--theme-warning)',
        'theme-error': 'var(--theme-error)',
        'theme-info': 'var(--theme-info)',
        'theme-text': 'var(--theme-text)',
        'theme-text-secondary': 'var(--theme-textSecondary)',
        'theme-text-tertiary': 'var(--theme-textTertiary)',
        'theme-text-light': 'var(--theme-textLight)',
        'theme-bg': 'var(--theme-background)',
        'theme-bg-light': 'var(--theme-backgroundLight)',
        'theme-bg-dark': 'var(--theme-backgroundDark)',
        'theme-border': 'var(--theme-border)',
        'theme-border-light': 'var(--theme-borderLight)',
        
        // 直接定义主题色（用于小程序环境）
        'green-primary': '#52c41a',
        'green-primary-light': '#73d13d',
        'green-primary-dark': '#389e0d',
        'blue-primary': '#1890ff',
        'blue-primary-light': '#40a9ff',
        'blue-primary-dark': '#096dd9',
        'orange-primary': '#fa8c16',
        'orange-primary-light': '#ffa940',
        'orange-primary-dark': '#d46b08',
        'purple-primary': '#722ed1',
        'purple-primary-light': '#9254de',
        'purple-primary-dark': '#531dab'
      },
      spacing: {
        // 适配小程序的间距系统
        '18': '4.5rem',
        '88': '22rem'
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px'
      },
      fontSize: {
        'xs': '10px',
        'sm': '12px',
        'base': '14px',
        'lg': '16px',
        'xl': '18px',
        '2xl': '20px',
        '3xl': '24px'
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.15)'
      }
    }
  },
  plugins: [],
  // 小程序兼容性配置
  corePlugins: {
    preflight: false, // 禁用默认样式重置，避免小程序样式冲突
  }
}