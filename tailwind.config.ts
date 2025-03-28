const config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-normal": "#5C4AE8",
        "primary-light": "#C8CDFF",
        "primary-pale": "#EBEDFF",
        "secondary-normal": "#ADE700",
        "secondary-light": "#D3EF7F",
        "secondary-pale": "#DEF599",
        "gray-50": "#F0F2F5",
        "gray-100": "#E6E8ED",
        "gray-200": "#CFD4DB",
        "gray-300": "#AEB4BD",
        "gray-400": "#929AA4",
        "gray-500": "#848C96",
        "gray-600": "#585D65",
        "gray-700": "#43474E",
        "gray-800": "#353940",
        "gray-900": "#2B2E33",
        background: "#D0D5DD",
        foreground: "#000000"
      },
      fontSize: {
        "3xl": "24px",
        "2xl": "20px",
        xl: "18px",
        lg: "16px",
        md: "14px",
        sm: "12px",
        xs: "10px"
      },
      screens: {
        sm: "345px",
        md: "375px",
        lg: "500px"
      }
    }
  },
  plugins: []
};

export default config;
