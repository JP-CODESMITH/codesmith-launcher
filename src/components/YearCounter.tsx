import { AppState, StyleSheet, Text, View } from 'react-native';

import Icon, { type IconName } from './Icon';
import { colors, fontSizes, fonts, radius, spacing } from '../theme/tokens';
import { useEffect, useState } from 'react';

type Stat = {
  label: string;
  icon: IconName;
  value: string;
  suffix?: string;
  caption: string;
  accent?: boolean;
};

// Date helpers for counting the days in the current year.

// Leap years have an extra day (Feb 29). A year is a leap year if it is
// divisible by 4, unless it is also divisible by 100 but not by 400.
export const isLeapYear = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;

// 366 in a leap year, otherwise 365.
export const daysInYear = (y: number) => (isLeapYear(y) ? 366 : 365);

// Returns which day of the year a date is, starting at 1 (Jan 1 = 1, Dec 31 = 365/366).
// Date.UTC is used so daylight-saving changes do not add or remove an hour.
export const dayOfYear = (d: Date = new Date()) => {
  const today = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  const start = Date.UTC(d.getFullYear(), 0, 1);
  return Math.floor((today - start) / 86_400_000) + 1;
};

// Days left AFTER today. On Oct 31 this returns 61 (today is not counted).
export const daysRemaining = (d: Date = new Date()) => daysInYear(d.getFullYear()) - dayOfYear(d);

// Same as above, but includes today. On Oct 31 this returns 62.
export const daysRemainingInclusive = (d: Date = new Date()) => daysRemaining(d) + 1;

// Fraction of the year that has passed, from 0 to 1.
export const yearProgress = (d: Date = new Date()) => dayOfYear(d) / daysInYear(d.getFullYear());

// Takes a fresh reading of the clock so the UI can show current values.
const snapshot = () => {
  const now = new Date();
  return {
    remaining: daysRemaining(now), // days left after today
    elapsed: dayOfYear(now), // day number of the year (1-based)
    total: daysInYear(now.getFullYear()), // 365 or 366
  };
};

// Custom hook that keeps the day count up to date.
// It recalculates at midnight, and also when the app comes back to the foreground
// (e.g. the phone was asleep across midnight).
export function useDaysRemaining() {
  // Start with today's numbers; useState(snapshot) runs snapshot once.
  const [state, setState] = useState(snapshot);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    // Set a timer for just after midnight, then reschedule it for the next night.
    const scheduleMidnight = () => {
      const now = new Date();
      const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 1);
      timer = setTimeout(() => {
        setState(snapshot());
        scheduleMidnight();
      }, next.getTime() - now.getTime());
    };

    scheduleMidnight();

    // Timers can be paused while the app is in the background, so refresh the
    // numbers whenever the app becomes active again.
    const sub = AppState.addEventListener('change', (s) => {
      if (s === 'active') {
        setState(snapshot());
        clearTimeout(timer);
        scheduleMidnight();
      }
    });

    // Cleanup: cancel the timer and remove the listener if the component unmounts.
    return () => {
      clearTimeout(timer);
      sub.remove();
    };
  }, []);

  return state;
}
export default function YearCounter() {
  // `remaining` is recalculated by the hook at midnight / app resume.
  const { remaining, total } = useDaysRemaining();

  // Percentage of the year still remaining (0-100).
  const percentOfYear = (totalDays: number, remainingDays: number) =>
    (remainingDays / totalDays) * 100;
  const percentLeft = percentOfYear(total, remaining);

  // Whole weeks left after today.
  const weeksRemaining = Math.ceil(remaining / 7);

  // Text version of the day count for the Horizon card.
  const remainingDays = remaining.toString();

  // The four cards shown in the 2x2 grid.

  const stats: Stat[] = [
    {
      label: 'Remaining',
      icon: 'pie',
      value: `${percentLeft.toFixed(1)}%`,
      caption: 'of 2026 left',
    },
    {
      label: 'Cycles',
      icon: 'calendar',
      value: weeksRemaining.toString(),
      caption: 'weeks left',
    },
    {
      label: 'Horizon',
      icon: 'hourglass',
      value: remainingDays,
      caption: 'days left',
    },
    {
      label: 'Discipline',
      icon: 'flame',
      value: '5',
      suffix: 'days',
      caption: 'unbroken streak',
      accent: true,
    },
  ];

  return (
    <View style={styles.grid}>
      {stats.map((stat) => {
        const tone = stat.accent ? colors.status.done : colors.text;
        const iconTone = stat.accent ? colors.status.done : colors.subtext;

        return (
          <View key={stat.label} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={[styles.label, stat.accent && styles.accentLabel]}>{stat.label}</Text>
              <Icon name={stat.icon} size={18} color={iconTone} />
            </View>
            <View style={styles.valueRow}>
              <Text style={[styles.value, { color: tone }]}>{stat.value}</Text>
              {stat.suffix ? (
                <Text style={[styles.suffix, { color: tone }]}>{stat.suffix}</Text>
              ) : null}
            </View>
            <Text style={styles.caption}>{stat.caption}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: spacing.md,
  },
  card: {
    width: '48%',
    backgroundColor: colors.surfaceContainer,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontFamily: fonts.mono,
    fontSize: fontSizes.labelBadge,
    lineHeight: 14,
    fontWeight: '600',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.subtext,
  },
  accentLabel: {
    color: colors.status.done,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginTop: spacing.sm,
  },
  value: {
    fontFamily: fonts.mono,
    fontSize: fontSizes.statCounter,
    lineHeight: 24,
    fontWeight: '600',
    letterSpacing: -0.4,
  },
  suffix: {
    fontFamily: fonts.mono,
    fontSize: fontSizes.bodySm,
    fontWeight: '500',
  },
  caption: {
    marginTop: 2,
    fontSize: fontSizes.bodySm,
    lineHeight: 16,
    color: colors.subtext,
  },
});
