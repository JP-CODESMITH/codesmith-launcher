import type { ReactNode } from 'react';
import Svg, { Circle, Ellipse, G, Line, Path, Polyline, Rect } from 'react-native-svg';

import { colors } from '../theme/tokens';

export type IconName =
  | 'pie'
  | 'calendar'
  | 'calendar-month'
  | 'hourglass'
  | 'flame'
  | 'signal'
  | 'wifi'
  | 'battery'
  | 'person'
  | 'sync'
  | 'plus'
  | 'check'
  | 'phone'
  | 'terminal'
  | 'globe'
  | 'code'
  | 'apps'
  | 'grid'
  | 'insights'
  | 'search'
  | 'mic'
  | 'arrow-right'
  | 'arrow-left'
  | 'close'
  | 'more'
  | 'pin'
  | 'info'
  | 'trash'
  | 'check-circle'
  | 'mail'
  | 'school'
  | 'headphones'
  | 'calculate'
  | 'shield'
  | 'external'
  | 'add-circle'
  | 'calendar-today';

type Props = {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
};

function renderShape(name: IconName, color: string): ReactNode {
  switch (name) {
    case 'search':
      return (
        <>
          <Circle cx="11" cy="11" r="7" />
          <Line x1="16" y1="16" x2="21" y2="21" />
        </>
      );
    case 'mic':
      return (
        <>
          <Rect x="9" y="3" width="6" height="11" rx="3" />
          <Path d="M5 11a7 7 0 0 0 14 0" />
          <Line x1="12" y1="18" x2="12" y2="21" />
        </>
      );
    case 'arrow-right':
      return (
        <>
          <Line x1="4" y1="12" x2="20" y2="12" />
          <Polyline points="14 6 20 12 14 18" />
        </>
      );
    case 'arrow-left':
      return (
        <>
          <Line x1="20" y1="12" x2="4" y2="12" />
          <Polyline points="10 6 4 12 10 18" />
        </>
      );
    case 'close':
      return (
        <>
          <Line x1="5" y1="5" x2="19" y2="19" />
          <Line x1="19" y1="5" x2="5" y2="19" />
        </>
      );
    case 'more':
      return (
        <>
          <Circle cx="12" cy="5" r="1.3" fill={color} stroke="none" />
          <Circle cx="12" cy="12" r="1.3" fill={color} stroke="none" />
          <Circle cx="12" cy="19" r="1.3" fill={color} stroke="none" />
        </>
      );
    case 'pin':
      return (
        <>
          <Path d="M9 3h6l-1 6 4 4v2H6v-2l4-4-1-6z" />
          <Line x1="12" y1="15" x2="12" y2="21" />
        </>
      );
    case 'info':
      return (
        <>
          <Circle cx="12" cy="12" r="9" />
          <Line x1="12" y1="11" x2="12" y2="16" />
          <Circle cx="12" cy="8" r="1" fill={color} stroke="none" />
        </>
      );
    case 'trash':
      return (
        <>
          <Polyline points="3 6 21 6" />
          <Path d="M8 6V4h8v2" />
          <Path d="M6 6l1 14h10l1-14" />
          <Line x1="10" y1="11" x2="10" y2="16" />
          <Line x1="14" y1="11" x2="14" y2="16" />
        </>
      );
    case 'check-circle':
      return (
        <>
          <Circle cx="12" cy="12" r="9" />
          <Polyline points="8 12 11 15 16 9" />
        </>
      );
    case 'mail':
      return (
        <>
          <Rect x="3" y="5" width="18" height="14" rx="2" />
          <Polyline points="3 7 12 13 21 7" />
        </>
      );
    case 'school':
      return (
        <>
          <Path d="M2 9l10-5 10 5-10 5L2 9z" />
          <Path d="M6 11v4c0 1.7 2.7 3 6 3s6-1.3 6-3v-4" />
        </>
      );
    case 'headphones':
      return (
        <>
          <Path d="M4 14v-2a8 8 0 0 1 16 0v2" />
          <Rect x="3" y="14" width="4" height="6" rx="2" />
          <Rect x="17" y="14" width="4" height="6" rx="2" />
        </>
      );
    case 'calculate':
      return (
        <>
          <Rect x="4" y="3" width="16" height="18" rx="2" />
          <Rect x="7" y="6" width="10" height="3" rx="1" fill={color} stroke="none" />
          <Circle cx="8" cy="13" r="1" fill={color} stroke="none" />
          <Circle cx="12" cy="13" r="1" fill={color} stroke="none" />
          <Circle cx="16" cy="13" r="1" fill={color} stroke="none" />
          <Circle cx="8" cy="17" r="1" fill={color} stroke="none" />
          <Circle cx="12" cy="17" r="1" fill={color} stroke="none" />
          <Circle cx="16" cy="17" r="1" fill={color} stroke="none" />
        </>
      );
    case 'shield':
      return <Path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />;
    case 'external':
      return (
        <>
          <Path d="M14 4h6v6" />
          <Line x1="20" y1="4" x2="11" y2="13" />
          <Path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
        </>
      );
    case 'add-circle':
      return (
        <>
          <Circle cx="12" cy="12" r="9" />
          <Line x1="12" y1="8" x2="12" y2="16" />
          <Line x1="8" y1="12" x2="16" y2="12" />
        </>
      );
    case 'calendar-today':
      return (
        <>
          <Rect x="3" y="4.5" width="18" height="16" rx="2" />
          <Line x1="3" y1="9.5" x2="21" y2="9.5" />
          <Line x1="8" y1="2.5" x2="8" y2="6.5" />
          <Line x1="16" y1="2.5" x2="16" y2="6.5" />
          <Rect x="8" y="12" width="3" height="3" rx="0.7" fill={color} stroke="none" />
        </>
      );
    case 'pie':
      return (
        <>
          <Circle cx="12" cy="12" r="9" />
          <Path d="M12 3v9h9" />
        </>
      );
    case 'calendar':
      return (
        <>
          <Rect x="3" y="4.5" width="18" height="16" rx="2" />
          <Line x1="3" y1="9.5" x2="21" y2="9.5" />
          <Line x1="8" y1="2.5" x2="8" y2="6.5" />
          <Line x1="16" y1="2.5" x2="16" y2="6.5" />
        </>
      );
    case 'calendar-month':
      return (
        <>
          <Rect x="3" y="4.5" width="18" height="16" rx="2" />
          <Line x1="3" y1="9.5" x2="21" y2="9.5" />
          <Line x1="8" y1="2.5" x2="8" y2="6.5" />
          <Line x1="16" y1="2.5" x2="16" y2="6.5" />
          <Circle cx="8" cy="14" r="1" fill={color} stroke="none" />
          <Circle cx="12" cy="14" r="1" fill={color} stroke="none" />
          <Circle cx="16" cy="14" r="1" fill={color} stroke="none" />
          <Circle cx="8" cy="17.5" r="1" fill={color} stroke="none" />
          <Circle cx="12" cy="17.5" r="1" fill={color} stroke="none" />
        </>
      );
    case 'hourglass':
      return (
        <Path d="M7 2.5h10M7 21.5h10M8 2.5c0 4 4 5.5 4 9.5s-4 5.5-4 9.5M16 2.5c0 4-4 5.5-4 9.5s4 5.5 4 9.5" />
      );
    case 'flame':
      return (
        <Path d="M12 2.5c.8 3.2 4.5 4.6 4.5 9a4.5 4.5 0 0 1-9 0c0-2.2 1.1-3.6 2.3-5.2.2 1.7 1 2.6 1.9 2.6.4-2.3-.4-4.4.3-6.4z" />
      );
    case 'signal':
      return (
        <>
          <Rect x="4" y="14" width="2.5" height="6" rx="0.5" fill={color} stroke="none" />
          <Rect x="10.75" y="9" width="2.5" height="11" rx="0.5" fill={color} stroke="none" />
          <Rect x="17.5" y="4" width="2.5" height="16" rx="0.5" fill={color} stroke="none" />
        </>
      );
    case 'wifi':
      return (
        <>
          <Path d="M2.5 8.5a14 14 0 0 1 19 0" />
          <Path d="M5.5 12a9.5 9.5 0 0 1 13 0" />
          <Path d="M8.5 15.5a5 5 0 0 1 7 0" />
          <Circle cx="12" cy="19" r="1.1" fill={color} stroke="none" />
        </>
      );
    case 'battery':
      return (
        <>
          <Rect x="2.5" y="7" width="17" height="10" rx="2" />
          <Line x1="22" y1="10.5" x2="22" y2="13.5" />
          <Rect x="4.5" y="9" width="11" height="6" rx="1" fill={color} stroke="none" />
        </>
      );
    case 'person':
      return (
        <>
          <Circle cx="12" cy="8" r="3.5" />
          <Path d="M4.5 21c0-3.6 3.4-5.5 7.5-5.5s7.5 1.9 7.5 5.5" />
        </>
      );
    case 'sync':
      return (
        <>
          <Path d="M20 11a8 8 0 0 0-14-4.5L4 9" />
          <Path d="M4 4.5V9h4.5" />
          <Path d="M4 13a8 8 0 0 0 14 4.5L20 15" />
          <Path d="M20 19.5V15h-4.5" />
        </>
      );
    case 'plus':
      return (
        <>
          <Line x1="12" y1="5" x2="12" y2="19" />
          <Line x1="5" y1="12" x2="19" y2="12" />
        </>
      );
    case 'check':
      return <Polyline points="20 6 9 17 4 12" />;
    case 'phone':
      return (
        <Path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2z" />
      );
    case 'terminal':
      return (
        <>
          <Polyline points="4 17 10 11 4 5" />
          <Line x1="12" y1="19" x2="20" y2="19" />
        </>
      );
    case 'globe':
      return (
        <>
          <Circle cx="12" cy="12" r="9" />
          <Ellipse cx="12" cy="12" rx="4" ry="9" />
          <Line x1="3" y1="12" x2="21" y2="12" />
        </>
      );
    case 'code':
      return (
        <>
          <Polyline points="16 18 22 12 16 6" />
          <Polyline points="8 6 2 12 8 18" />
        </>
      );
    case 'apps':
      return (
        <>
          <Rect x="3" y="3" width="7.5" height="7.5" rx="1.8" fill={color} stroke="none" />
          <Rect x="13.5" y="3" width="7.5" height="7.5" rx="1.8" fill={color} stroke="none" />
          <Rect x="3" y="13.5" width="7.5" height="7.5" rx="1.8" fill={color} stroke="none" />
          <Rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.8" fill={color} stroke="none" />
        </>
      );
    case 'grid':
      return (
        <>
          <Rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
          <Rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
          <Rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
          <Rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
        </>
      );
    case 'insights':
      return (
        <>
          <Line x1="3" y1="20" x2="21" y2="20" />
          <Rect x="4.5" y="12" width="3" height="6" rx="1" fill={color} stroke="none" />
          <Rect x="10.5" y="8" width="3" height="10" rx="1" fill={color} stroke="none" />
          <Rect x="16.5" y="4" width="3" height="14" rx="1" fill={color} stroke="none" />
        </>
      );
  }
}

export default function Icon({ name, size = 20, color = colors.text, strokeWidth = 1.8 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {renderShape(name, color)}
      </G>
    </Svg>
  );
}
