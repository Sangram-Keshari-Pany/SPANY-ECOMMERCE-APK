import { Appearance, Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');
const fontScale = PixelRatio.getFontScale();

export const dynamicFontSize = 14 * fontScale;
export const dynamicMargin = width * 0.05;
export const dynamicPadding = width * 0.05;
export const dynamicBorderRadius = width * 0.05;
export const dynamicWidth = width - dynamicPadding * 2;
export const contentWidth = width - dynamicPadding * 2;
export const dynamicIconSize = Math.min(width, height) * 0.1;

export let Mode =Appearance.getColorScheme()=="dark" 
let DarkMode = Mode;

export function ColorMode(mode){
  Mode=mode
  DarkMode=mode
}

export const Themes = {
  gradient0: ['transparent', 'transparent'],
  gradient1: DarkMode ? ['#001F3F', '#006BFF'] : ['#001F3F', '#006BFA'],
  gradient2: DarkMode ? ['#001F3F', '#006BFA'] : ['#C9D1E4', '#F1F5FF'],
  svgcolor1: DarkMode ? '#1C1C1C' : '#F1F5FF',
  svgcolor2: DarkMode ? '#2A2A2A' : '#C9D1E4',
  svgcolor3: '#001F3F',
  svgcolor4: '#006BFA',

  color1: DarkMode ? '#000000' : '#FFFFFF', // Background/Primary text
  color2: DarkMode ? '#006BFF' : '#004399', // Primary action/link
  color3: DarkMode ? '#2B2C31' : '#D9E4FF', // Secondary background/lighter text
  color5: DarkMode ? '#2B2C31' : '#F1F1F1', // Subtle background/divider
  color6: '#FFFFFF', // White/Off-white
  color7: DarkMode ? '#5f5f5f' : '#808080', // Medium gray/placeholder
  color8: DarkMode ? '#ff0070' : '#004399', // Highlight/accent
  color9: DarkMode ? '#CAC9C9' : '#000000', // Border/strong gray
  color10: DarkMode ? '#434343' : '#FFFFFF', // Shadow/overlay
  color11: DarkMode ? '#CAC9C9' : '#0252FF', // Secondary action/link
  color12: DarkMode ? '#ff0070' : '#000000', // Alert/error
  color13: DarkMode ? '#ff0070' : '#FFFFFF', // Notification badge/text
  color14: '#ff0070', // Consistent highlight
  color15: '#ff0070', // Consistent highlight
  color16: DarkMode ? '#CAC9C9' : '#FFFFFF', // Light border/background
  color17: DarkMode ? '#000000' : '#004BFE', // Strong action/link
  color18: '#F0A80E', // Consistent accent/warning
};

