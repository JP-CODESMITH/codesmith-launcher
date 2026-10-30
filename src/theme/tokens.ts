import { Platform } from 'react-native';

export const colors = {
  bg: '#0D1117',
  surface: '#161B22',
  surfaceLow: '#141C24',
  surfaceContainer: '#182028',
  surfaceHigh: '#222B33',
  surfaceHighest: '#2D363E',
  empty: '#21262D',
  border: '#30363D',
  text: '#E6EDF3',
  subtext: '#8B949E',
  accent: '#58A6FF',
  accentDim: '#A2C9FF',
  status: {
    done: '#3FB950',
    partial: '#D29922',
    missed: '#DA3633',
    plain: '#21262D',
  },
  priority: {
    P1: '#A371F7',
    P2: '#F0883E',
    P3: '#58A6FF',
    P4: '#8B949E',
  },
} as const;

export type StatusColor = keyof typeof colors.status;
export type Priority = keyof typeof colors.priority;

export const fonts = {
  mono: Platform.select({ android: 'monospace', ios: 'Courier', default: 'monospace' }),
} as const;

export const fontSizes = {
  display: 48,
  headlineLg: 24,
  headlineMd: 18,
  bodyLg: 16,
  bodyMd: 14,
  bodySm: 12,
  labelCode: 13,
  labelBadge: 11,
  statCounter: 20,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  margin: 16,
  gutter: 12,
} as const;

export const radius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;
