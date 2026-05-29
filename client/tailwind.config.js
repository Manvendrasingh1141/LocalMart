/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "colors": {
        "secondary": "#5a5d76",
        "tertiary": "#00677e",
        "surface-container-lowest": "#ffffff",
        "secondary-fixed": "#dfe0ff",
        "surface-container-highest": "#d3e4fe",
        "surface-dim": "#cbdbf5",
        "on-secondary-container": "#60637c",
        "on-secondary": "#ffffff",
        "on-tertiary-fixed-variant": "#004e60",
        "secondary-fixed-dim": "#c3c4e2",
        "primary-container": "#ff6b35",
        "on-tertiary-fixed": "#001f28",
        "tertiary-container": "#00a7cb",
        "on-surface": "#0b1c30",
        "on-background": "#0b1c30",
        "inverse-surface": "#213145",
        "on-error": "#ffffff",
        "on-tertiary": "#ffffff",
        "surface-container": "#e5eeff",
        "surface": "#f8f9ff",
        "on-primary": "#ffffff",
        "on-primary-fixed-variant": "#832600",
        "surface-tint": "#ab3500",
        "primary-fixed": "#ffdbd0",
        "on-tertiary-container": "#003744",
        "on-primary-container": "#5f1900",
        "tertiary-fixed": "#b5ebff",
        "on-primary-fixed": "#390c00",
        "surface-variant": "#d3e4fe",
        "error": "#ba1a1a",
        "outline": "#8d7168",
        "secondary-container": "#dfe0ff",
        "on-secondary-fixed": "#171a30",
        "on-surface-variant": "#594139",
        "outline-variant": "#e1bfb5",
        "primary-fixed-dim": "#ffb59d",
        "on-error-container": "#93000a",
        "inverse-on-surface": "#eaf1ff",
        "background": "#f8f9ff",
        "surface-container-high": "#dce9ff",
        "surface-bright": "#f8f9ff",
        "tertiary-fixed-dim": "#59d5fb",
        "surface-container-low": "#eff4ff",
        "inverse-primary": "#ffb59d",
        "on-secondary-fixed-variant": "#42455d",
        "primary": "#ab3500"
      },
      "borderRadius": {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      "spacing": {
        "base": "8px",
        "margin-mobile": "16px",
        "margin-desktop": "40px",
        "gutter": "24px",
        "max-width": "1280px"
      },
      "fontFamily": {
        "body-lg": ["Inter", "sans-serif"],
        "label-md": ["Inter", "sans-serif"],
        "display-lg": ["Plus Jakarta Sans", "sans-serif"],
        "label-sm": ["Inter", "sans-serif"],
        "headline-lg-mobile": ["Plus Jakarta Sans", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "headline-md": ["Plus Jakarta Sans", "sans-serif"],
        "headline-lg": ["Plus Jakarta Sans", "sans-serif"]
      },
      "fontSize": {
        "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
        "label-md": ["14px", {"lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "600"}],
        "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "label-sm": ["12px", {"lineHeight": "16px", "fontWeight": "500"}],
        "headline-lg-mobile": ["28px", {"lineHeight": "36px", "fontWeight": "700"}],
        "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
        "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
        "headline-lg": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700"}]
      },
      animation: {
        'slide-up': 'slideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      keyframes: {
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    }
  },
  plugins: [],
}
