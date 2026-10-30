import { StyleSheet, Text, View } from 'react-native';

import Icon, { type IconName } from './Icon';
import { colors, fontSizes, fonts, radius, spacing } from '../theme/tokens';

type Stat = {
  label: string;
  icon: IconName;
  value: string;
  suffix?: string;
  caption: string;
  accent?: boolean;
};

const stats: Stat[] = [
  {
    label: 'Remaining',
    icon: 'pie',
    value: '18.6%',
    caption: 'of 2026 left',
  },
  {
    label: 'Cycles',
    icon: 'calendar',
    value: '9.7',
    caption: 'weeks left',
  },
  {
    label: 'Horizon',
    icon: 'hourglass',
    value: '68',
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

export default function YearCounter() {
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
