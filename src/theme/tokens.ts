export const colors = {
  bg: '#0D1117',
  surface: '#161B22',
  empty: '#21262D',
  text: '#E6EDF3',
  subtext: '#8B949E',
  accent: '#58A6FF',
  status: {
    done: '#2EA043',
    partial: '#D29922',
    missed: '#DA3633',
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
