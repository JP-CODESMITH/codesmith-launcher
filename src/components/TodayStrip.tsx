import { StyleSheet, Text, View } from 'react-native';

import Icon from './Icon';
import { colors, fontSizes, fonts, radius, spacing } from '../theme/tokens';
import type { Priority } from '../theme/tokens';

type Task = {
  id: number;
  title: string;
  priority: Priority;
  time: string;
  done: boolean;
};

const tasks: Task[] = [
  {
    id: 1,
    title: 'Deploy database migration to production',
    priority: 'P1',
    time: '09:00',
    done: true,
  },
  {
    id: 2,
    title: 'Morning 5km endurance run',
    priority: 'P2',
    time: '07:30',
    done: true,
  },
  {
    id: 3,
    title: 'Review Q4 product roadmap & OKRs',
    priority: 'P1',
    time: '14:00',
    done: false,
  },
  {
    id: 4,
    title: 'Ship v2.4 build to Google Play Console',
    priority: 'P2',
    time: '16:30',
    done: false,
  },
  {
    id: 5,
    title: '30m interval running session',
    priority: 'P3',
    time: '18:00',
    done: false,
  },
];

const doneCount = tasks.filter((task) => task.done).length;

export default function TodayStrip() {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Today</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>
              {doneCount}/{tasks.length} done
            </Text>
          </View>
        </View>
        <View style={styles.addButton}>
          <Icon name="plus" size={15} color={colors.accent} />
          <Text style={styles.addLabel}>Add Task</Text>
        </View>
      </View>

      <View style={styles.list}>
        {tasks.map((task, index) => {
          const priorityColor = colors.priority[task.priority];

          return (
            <View
              key={task.id}
              style={[styles.row, index !== tasks.length - 1 && styles.rowDivider]}
            >
              <View style={styles.rowLeft}>
                <View style={[styles.checkbox, task.done && styles.checkboxDone]}>
                  {task.done ? (
                    <Icon name="check" size={13} color={colors.bg} strokeWidth={2.6} />
                  ) : null}
                </View>
                <View
                  style={[
                    styles.priorityBadge,
                    {
                      backgroundColor: `${priorityColor}26`,
                      borderColor: `${priorityColor}66`,
                      opacity: task.done ? 0.6 : 1,
                    },
                  ]}
                >
                  <Text style={[styles.priorityText, { color: priorityColor }]}>
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
              <Text style={styles.time}>{task.time}</Text>
            </View>
          );
        })}
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    fontSize: fontSizes.headlineMd,
    lineHeight: 24,
    fontWeight: '600',
    color: colors.text,
  },
  countBadge: {
    backgroundColor: colors.surfaceHigh,
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  countText: {
    fontSize: fontSizes.labelBadge,
    lineHeight: 14,
    fontWeight: '500',
    color: colors.subtext,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.md,
  },
  addLabel: {
    fontFamily: fonts.mono,
    fontSize: fontSizes.labelCode,
    lineHeight: 18,
    fontWeight: '500',
    color: colors.accent,
  },
  list: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.surfaceHighest,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  rowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.surfaceHighest,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
    minWidth: 0,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.subtext,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: {
    backgroundColor: colors.status.done,
    borderColor: colors.status.done,
  },
  priorityBadge: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
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
    color: colors.text,
  },
  taskTitleDone: {
    color: colors.subtext,
    textDecorationLine: 'line-through',
  },
  time: {
    fontFamily: fonts.mono,
    fontSize: fontSizes.bodySm,
    lineHeight: 16,
    color: colors.subtext,
  },
});
