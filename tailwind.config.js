/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    spacing: {
      ...Array.from({ length: 2000 }).reduce((map, _, index) => {
        map[index] = `${index}px`;
        return map;
      }, {}),
      half: "50%",
    },
    extend: {
      maxHeight: {
        "80vh": "80vh",
        "90vh": "90vh",
      },
      flex: {
        1: "1", // 覆盖默认的 1 1 0%
      },
      whitespace: {
        prewrap: "pre-wrap", // 覆盖默认的 pre-wrap
      },
    },
    fontSize: {
      0: ["0px", "0px"],
      8: ["8px", "12px"],
      10: ["10px", "14px"],
      11: ["11px", "16px"],
      12: ["12px", "16px"],
      13: ["13px", "18px"],
      14: ["14px", "20px"],
      15: ["15px", "21px"],
      16: ["16px", "22px"],
      18: ["18px", "22px"],
      20: ["20px", "28px"],
      24: ["24px", "34px"],
      26: ["26px", "30px"],
      28: ["28px", "32px"],
      30: ["30px", "34px"],
      36: ["36px", "40px"],
      40: ["40px", "56px"],
    },
    lineHeight: {
      14: "14px",
      15: "15px",
      24: "24px",
      44: "44px",
    },
    borderRadius: {
      2: "2px",
      4: "4px",
      5: "5px",
      6: "6px",
      8: "8px",
      10: "10px",
      12: "12px",
      14: "14px",
      16: "16px",
      20: "20px",
      40: "40px",
      full: "9999px",
    },
    zIndex: {
      810: "810",
      811: "811",
      0: "0",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      50: "50",
      10: "10",
      999: "999",
      9999: "9999",
    },
    fontWeight: {
      thin: "100",
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900",
    },
    extend: {
      colors: {
        // 使用现有主题系统的颜色
        "theme-primary": "var(--theme-primary)",
        "theme-primary-light": "var(--theme-primaryLight)",
        "theme-primary-dark": "var(--theme-primaryDark)",
        "theme-secondary": "var(--theme-secondary)",
        "theme-secondary-light": "var(--theme-secondaryLight)",
        "theme-secondary-dark": "var(--theme-secondaryDark)",
        "theme-accent": "var(--theme-accent)",
        "theme-accent-light": "var(--theme-accentLight)",
        "theme-accent-dark": "var(--theme-accentDark)",
        "theme-success": "var(--theme-success)",
        "theme-warning": "var(--theme-warning)",
        "theme-error": "var(--theme-error)",
        "theme-info": "var(--theme-info)",
        "theme-text": "var(--theme-text)",
        "theme-text-secondary": "var(--theme-textSecondary)",
        "theme-text-tertiary": "var(--theme-textTertiary)",
        "theme-text-light": "var(--theme-textLight)",
        "theme-bg": "var(--theme-background)",
        "theme-bg-light": "var(--theme-backgroundLight)",
        "theme-bg-dark": "var(--theme-backgroundDark)",
        "theme-border": "var(--theme-border)",
        "theme-border-light": "var(--theme-borderLight)",

        // 直接定义主题色（用于小程序环境）
        "green-primary": "#52c41a",
        "green-primary-light": "#73d13d",
        "green-primary-dark": "#389e0d",
        "blue-primary": "#1890ff",
        "blue-primary-light": "#40a9ff",
        "blue-primary-dark": "#096dd9",
        "orange-primary": "#fa8c16",
        "orange-primary-light": "#ffa940",
        "orange-primary-dark": "#d46b08",
        "purple-primary": "#722ed1",
        "purple-primary-light": "#9254de",
        "purple-primary-dark": "#531dab",
      },
    },
  },
  plugins: [],
  // 小程序兼容性配置
  corePlugins: {
    preflight: false, // 禁用默认样式重置，避免小程序样式冲突
  },
};
