import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontSizes, fonts, radius, spacing } from '../theme/tokens';

const TOTAL_DAYS = 365;
const TODAY_INDEX = 297;

const missedDays = new Set([12, 34, 45, 89, 120, 165, 192, 230, 271]);
const partialDays = new Set([8, 19, 29, 62, 75, 104, 138, 150, 180, 210, 245, 260, 285]);
const futurePins: Record<number, string> = {
  305: colors.priority.P1,
  318: colors.priority.P2,
  332: colors.priority.P3,
};

type Cell = {
  index: number;
  color: string;
  today: boolean;
  pin?: string;
};

const cells: Cell[] = Array.from({ length: TOTAL_DAYS }, (_, index) => {
  if (index < TODAY_INDEX) {
    if (missedDays.has(index)) {
      return { index, color: colors.status.missed, today: false };
    }
    if (partialDays.has(index)) {
      return { index, color: colors.status.partial, today: false };
    }
    return { index, color: colors.status.done, today: false };
  }

  if (index === TODAY_INDEX) {
    return { index, color: colors.status.done, today: true };
  }

  return { index, color: colors.empty, today: false, pin: futurePins[index] };
});

const months = ['JAN', 'MAR', 'MAY', 'JUL', 'SEP', 'NOV'];

const legend = [
  { label: 'Missed', color: colors.status.missed },
  { label: 'Partial', color: colors.status.partial },
  { label: 'Done', color: colors.status.done },
  { label: 'Empty', color: colors.empty },
];

type Props = {
  onSelectDay?: () => void;
};

export default function YearGrid({ onSelectDay }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.year}>2026</Text>
          <Text style={styles.subtitle}>/ Annual Matrix</Text>
        </View>
        <View style={styles.todayBadge}>
          <Text style={styles.todayBadgeText}>Day 298: Today</Text>
        </View>
      </View>

      <View style={styles.months}>
        {months.map((month) => (
          <Text key={month} style={styles.month}>
            {month}
          </Text>
        ))}
      </View>

      <View style={styles.grid}>
        {cells.map((cell) => (
          <Pressable key={cell.index} onPress={onSelectDay} style={styles.cellSlot}>
            <View
              style={[styles.cell, { backgroundColor: cell.color }, cell.today && styles.todayCell]}
            >
              {cell.pin ? <View style={[styles.pin, { backgroundColor: cell.pin }]} /> : null}
            </View>
          </Pressable>
        ))}
      </View>

      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Commit intensity</Text>
        <View style={styles.legendItems}>
          {legend.map((item) => (
            <View key={item.label} style={styles.legendItem}>
              <View style={[styles.legendSwatch, { backgroundColor: item.color }]} />
              <Text style={styles.legendLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainer,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs,
  },
  year: {
    fontSize: fontSizes.headlineMd,
    lineHeight: 24,
    fontWeight: '600',
    color: colors.text,
  },
  subtitle: {
    fontSize: fontSizes.bodySm,
    lineHeight: 16,
    color: colors.subtext,
  },
  todayBadge: {
    backgroundColor: colors.surfaceHigh,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
  },
  todayBadgeText: {
    fontFamily: fonts.mono,
    fontSize: fontSizes.labelBadge,
    lineHeight: 14,
    fontWeight: '600',
    color: colors.accent,
  },
  months: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingBottom: spacing.xs,
  },
  month: {
    fontFamily: fonts.mono,
    fontSize: 10,
    lineHeight: 14,
    color: colors.subtext,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cellSlot: {
    width: `${100 / 19}%`,
    aspectRatio: 1,
    padding: 1,
  },
  cell: {
    flex: 1,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todayCell: {
    borderWidth: 1.5,
    borderColor: colors.text,
  },
  pin: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.md,
    marginTop: spacing.xs,
  },
  legendTitle: {
    fontSize: 11,
    lineHeight: 14,
    color: colors.subtext,
  },
  legendItems: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendSwatch: {
    width: 10,
    height: 10,
    borderRadius: 3,
  },
  legendLabel: {
    fontSize: 10,
    lineHeight: 14,
    color: colors.subtext,
  },
});
