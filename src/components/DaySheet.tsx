import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Icon from './Icon';
import { colors, fontSizes, fonts, radius, spacing } from '../theme/tokens';
import type { Priority } from '../theme/tokens';

type Task = {
  id: number;
  title: string;
  priority: Priority;
  done: boolean;
};

const tasks: Task[] = [
  { id: 1, title: 'Morning 5km endurance run', priority: 'P2', done: true },
  { id: 2, title: 'Deploy database migration to production', priority: 'P1', done: true },
  { id: 3, title: 'Review Q4 product roadmap & OKRs', priority: 'P1', done: false },
  { id: 4, title: 'Ship v2.4 build to Google Play Console', priority: 'P2', done: false },
  { id: 5, title: '30m interval running session', priority: 'P3', done: false },
];

const priorities: { key: Priority; label: string }[] = [
  { key: 'P1', label: 'P1 Critical' },
  { key: 'P2', label: 'P2 High' },
  { key: 'P3', label: 'P3 Normal' },
  { key: 'P4', label: 'P4 Minor' },
];

const doneCount = tasks.filter((task) => task.done).length;
const progress = Math.round((doneCount / tasks.length) * 100);

type Props = {
  onClose: () => void;
};

export default function DaySheet({ onClose }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.overlay}>
      <View style={styles.scrim} />
      <View style={[styles.sheet, { paddingBottom: insets.bottom + spacing.sm }]}>
        <View style={styles.handleWrap}>
          <View style={styles.handle} />
        </View>

        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.titleRow}>
              <Icon name="calendar-today" size={20} color={colors.accent} />
              <Text style={styles.title} numberOfLines={1}>
                Saturday, 24 Oct 2026 · <Text style={styles.titleAccent}>Today</Text>
              </Text>
            </View>
            <View style={styles.closeButton}>
              <Icon name="close" size={18} color={colors.subtext} />
            </View>
          </View>

          <View style={styles.progressBlock}>
            <View style={styles.progressLabels}>
              <Text style={styles.progressText}>
                {tasks.length} tasks total · {doneCount} completed ({progress}%)
              </Text>
              <Text style={styles.onTrack}>● On Track</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
          </View>
        </View>

        <ScrollView
          style={styles.taskScroll}
          contentContainerStyle={styles.taskList}
          showsVerticalScrollIndicator={false}
        >
          {tasks.map((task) => {
            const priorityColor = colors.priority[task.priority];

            return (
              <View
                key={task.id}
                style={[styles.taskRow, task.done ? styles.taskRowDone : styles.taskRowActive]}
              >
                <View style={styles.taskLeft}>
                  <View style={[styles.checkbox, task.done && styles.checkboxDone]}>
                    {task.done ? (
                      <Icon name="check" size={15} color={colors.bg} strokeWidth={2.6} />
                    ) : null}
                  </View>
                  <View
                    style={[
                      styles.priorityBadge,
                      task.done
                        ? styles.priorityBadgeDone
                        : {
                            backgroundColor: `${priorityColor}26`,
                            borderColor: `${priorityColor}66`,
                          },
                    ]}
                  >
                    <Text
                      style={[
                        styles.priorityText,
                        { color: task.done ? colors.subtext : priorityColor },
                      ]}
                    >
                      {task.priority}
                    </Text>
                  </View>
                  <Text
                    style={[styles.taskTitle, task.done && styles.taskTitleDone]}
                    numberOfLines={1}
                  >
                    {task.title}
                  </Text>
                </View>
                <Icon name="close" size={18} color={colors.subtext} />
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.composer}>
          <View style={styles.chips}>
            {priorities.map((priority) => {
              const active = priority.key === 'P1';
              const tone = colors.priority[priority.key];

              return (
                <View
                  key={priority.key}
                  style={[
                    styles.chip,
                    active
                      ? {
                          backgroundColor: `${tone}26`,
                          borderColor: tone,
                        }
                      : styles.chipIdle,
                  ]}
                >
                  <Text style={[styles.chipText, { color: active ? tone : colors.subtext }]}>
                    {priority.label}
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={styles.inputRow}>
            <View style={styles.input}>
              <Text style={styles.inputPlaceholder}>New task...</Text>
            </View>
            <View style={styles.addButton}>
              <Icon name="plus" size={18} color={colors.bg} strokeWidth={2.4} />
              <Text style={styles.addLabel}>Add</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    zIndex: 50,
  },
  scrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(11, 20, 28, 0.78)',
  },
  sheet: {
    height: '84%',
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    borderTopWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.margin,
  },
  handleWrap: {
    alignItems: 'center',
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: radius.full,
    backgroundColor: colors.border,
  },
  header: {
    gap: spacing.sm,
    paddingBottom: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: fontSizes.bodyLg,
    lineHeight: 24,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  titleAccent: {
    color: colors.accent,
    fontWeight: '400',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBlock: {
    gap: 6,
    paddingTop: spacing.xs,
  },
  progressLabels: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressText: {
    fontFamily: fonts.mono,
    fontSize: fontSizes.bodySm,
    lineHeight: 16,
    color: colors.subtext,
  },
  onTrack: {
    fontFamily: fonts.mono,
    fontSize: fontSizes.bodySm,
    lineHeight: 16,
    fontWeight: '600',
    color: colors.status.done,
  },
  progressTrack: {
    height: 6,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceHighest,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: radius.full,
    backgroundColor: colors.status.done,
  },
  taskScroll: {
    flex: 1,
  },
  taskList: {
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.lg,
  },
  taskRowDone: {
    backgroundColor: colors.surfaceLow,
  },
  taskRowActive: {
    backgroundColor: colors.surfaceHigh,
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
    minWidth: 0,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: colors.surfaceHighest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: {
    backgroundColor: colors.status.done,
  },
  priorityBadge: {
    borderWidth: 1,
    borderRadius: radius.sm,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  priorityBadgeDone: {
    backgroundColor: colors.surfaceHighest,
    borderColor: 'transparent',
  },
  priorityText: {
    fontFamily: fonts.mono,
    fontSize: fontSizes.labelBadge,
    lineHeight: 14,
    fontWeight: '600',
  },
  taskTitle: {
    flex: 1,
    fontSize: fontSizes.bodyMd,
    lineHeight: 20,
    fontWeight: '500',
    color: colors.text,
  },
  taskTitleDone: {
    fontWeight: '400',
    color: colors.subtext,
    textDecorationLine: 'line-through',
  },
  composer: {
    gap: spacing.sm,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  chips: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  chip: {
    borderWidth: 1,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  chipIdle: {
    backgroundColor: colors.surfaceHigh,
    borderColor: 'transparent',
  },
  chipText: {
    fontFamily: fonts.mono,
    fontSize: fontSizes.labelBadge,
    lineHeight: 14,
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: colors.surfaceHigh,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  inputPlaceholder: {
    fontSize: fontSizes.bodyMd,
    lineHeight: 20,
    color: colors.subtext,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.status.done,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  addLabel: {
    fontSize: fontSizes.bodyMd,
    lineHeight: 20,
    fontWeight: '600',
    color: colors.bg,
  },
});
