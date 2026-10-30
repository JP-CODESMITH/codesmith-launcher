import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Icon, { type IconName } from './Icon';
import { colors, fontSizes, fonts, radius, spacing } from '../theme/tokens';

type Trailing = 'arrow' | 'review' | 'check' | 'dot' | 'more';

type DrawerApp = {
  name: string;
  meta: string;
  icon: IconName;
  iconColor: string;
  trailing?: Trailing;
  active?: boolean;
  menu?: boolean;
};

type Section = {
  letter: string;
  apps: DrawerApp[];
};

const sections: Section[] = [
  {
    letter: 'A',
    apps: [
      {
        name: 'Android Studio',
        meta: 'Developer Tools · 1.4 GB',
        icon: 'terminal',
        iconColor: colors.status.done,
        trailing: 'arrow',
      },
      {
        name: 'Anki Pro',
        meta: 'Education · 42 cards due',
        icon: 'school',
        iconColor: colors.accent,
        trailing: 'review',
      },
      {
        name: 'Audible',
        meta: 'Audiobooks · 3h left',
        icon: 'headphones',
        iconColor: colors.priority.P1,
        trailing: 'arrow',
      },
    ],
  },
  {
    letter: 'B',
    apps: [
      {
        name: 'Bitwarden',
        meta: 'Passwords · Locked',
        icon: 'shield',
        iconColor: colors.accent,
        trailing: 'check',
      },
      {
        name: 'Brave Browser',
        meta: 'Browser · Shield Active',
        icon: 'globe',
        iconColor: colors.priority.P1,
        trailing: 'arrow',
      },
    ],
  },
  {
    letter: 'C',
    apps: [
      {
        name: 'Calculator',
        meta: 'Utilities · Programmer Mode',
        icon: 'calculate',
        iconColor: colors.subtext,
        trailing: 'arrow',
      },
      {
        name: 'Calendar',
        meta: '10:30 AM · Team Sync',
        icon: 'calendar-today',
        iconColor: colors.accent,
        trailing: 'more',
        active: true,
        menu: true,
      },
      {
        name: 'Chrome',
        meta: 'Browser · 8 tabs open',
        icon: 'globe',
        iconColor: colors.accentDim,
        trailing: 'arrow',
      },
    ],
  },
  {
    letter: 'G',
    apps: [
      {
        name: 'GitHub',
        meta: 'DevOps · 4 PRs pending',
        icon: 'code',
        iconColor: colors.text,
        trailing: 'dot',
      },
      {
        name: 'Gmail',
        meta: 'Email · Work (1 unread)',
        icon: 'mail',
        iconColor: colors.status.missed,
        trailing: 'arrow',
      },
    ],
  },
];

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');

function TrailingIcon({ kind }: { kind: Trailing }) {
  switch (kind) {
    case 'review':
      return (
        <View style={styles.reviewBadge}>
          <Text style={styles.reviewText}>REVIEW</Text>
        </View>
      );
    case 'check':
      return <Icon name="check-circle" size={18} color={colors.status.done} />;
    case 'dot':
      return <View style={styles.onlineDot} />;
    case 'more':
      return <Icon name="more" size={20} color={colors.accent} />;
    case 'arrow':
      return <Icon name="arrow-right" size={18} color={colors.border} />;
  }
}

function ContextMenu() {
  return (
    <View style={styles.menu}>
      <View style={[styles.menuItem, styles.menuItemActive]}>
        <View style={styles.menuItemLeft}>
          <Icon name="pin" size={18} color={colors.accent} />
          <Text style={styles.menuItemTextStrong}>Pin to home</Text>
        </View>
        <Text style={styles.menuSlot}>SLOT 3</Text>
      </View>
      <View style={styles.menuItem}>
        <View style={styles.menuItemLeft}>
          <Icon name="info" size={18} color={colors.subtext} />
          <Text style={styles.menuItemText}>App info</Text>
        </View>
        <Icon name="external" size={14} color={colors.subtext} />
      </View>
      <View style={styles.menuItem}>
        <View style={styles.menuItemLeft}>
          <Icon name="add-circle" size={18} color={colors.status.done} />
          <Text style={styles.menuItemText}>New Event</Text>
        </View>
      </View>
      <View style={styles.menuDivider} />
      <View style={styles.menuItem}>
        <View style={styles.menuItemLeft}>
          <Icon name="trash" size={18} color={colors.status.missed} />
          <Text style={[styles.menuItemText, styles.menuItemDanger]}>Uninstall</Text>
        </View>
      </View>
    </View>
  );
}

export default function AppDrawer() {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <View style={styles.searchLeft}>
          <Icon name="search" size={18} color={colors.subtext} />
          <Text style={styles.searchPlaceholder}>Search apps or commands...</Text>
        </View>
        <View style={styles.searchRight}>
          <View style={styles.shortcut}>
            <Text style={styles.shortcutText}>⌘K</Text>
          </View>
          <Icon name="mic" size={18} color={colors.subtext} />
        </View>
      </View>

      <View style={styles.body}>
        <ScrollView
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          {sections.map((section) => (
            <View key={section.letter} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionLetter}>{section.letter}</Text>
                <View style={styles.sectionRule} />
                <Text style={styles.sectionCount}>{section.apps.length} APPS</Text>
              </View>

              <View style={styles.sectionApps}>
                {section.apps.map((app) => (
                  <View key={app.name}>
                    <View style={[styles.appRow, app.active && styles.appRowActive]}>
                      <View style={styles.appLeft}>
                        <View style={styles.appIcon}>
                          <Icon name={app.icon} size={24} color={app.iconColor} />
                        </View>
                        <View style={styles.appText}>
                          <Text style={styles.appName} numberOfLines={1}>
                            {app.name}
                          </Text>
                          <Text
                            style={[styles.appMeta, app.active && styles.appMetaActive]}
                            numberOfLines={1}
                          >
                            {app.meta}
                          </Text>
                        </View>
                      </View>
                      {app.trailing ? <TrailingIcon kind={app.trailing} /> : null}
                    </View>
                    {app.menu ? <ContextMenu /> : null}
                  </View>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.alphabetRail}>
          {alphabet.map((letter) => (
            <Text
              key={letter}
              style={[styles.alphabetLetter, letter === 'C' && styles.alphabetLetterActive]}
            >
              {letter}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <View style={styles.liveDot} />
          <Text style={styles.footerText}>72 APPS INDEXED</Text>
        </View>
        <View style={styles.footerRight}>
          <Text style={styles.footerText}>DRAWER READY</Text>
          <Icon name="check" size={13} color={colors.subtext} strokeWidth={2.4} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.margin,
    paddingTop: spacing.sm,
    paddingBottom: 96,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceContainer,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  searchLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
    minWidth: 0,
  },
  searchPlaceholder: {
    fontSize: fontSizes.bodyMd,
    lineHeight: 20,
    color: colors.subtext,
  },
  searchRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  shortcut: {
    backgroundColor: colors.surfaceHigh,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.xs,
    paddingVertical: 1,
  },
  shortcutText: {
    fontFamily: fonts.mono,
    fontSize: fontSizes.labelBadge,
    lineHeight: 14,
    fontWeight: '600',
    color: colors.subtext,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    marginTop: spacing.md,
  },
  list: {
    flex: 1,
    paddingRight: spacing.xl,
  },
  listContent: {
    gap: spacing.md,
  },
  section: {
    gap: spacing.xs,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: 4,
  },
  sectionLetter: {
    fontFamily: fonts.mono,
    fontSize: fontSizes.labelBadge,
    lineHeight: 14,
    fontWeight: '600',
    color: colors.accent,
  },
  sectionRule: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.surfaceHighest,
  },
  sectionCount: {
    fontFamily: fonts.mono,
    fontSize: 10,
    lineHeight: 14,
    color: colors.subtext,
  },
  sectionApps: {
    gap: spacing.xs,
  },
  appRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.xs,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceContainer,
  },
  appRowActive: {
    backgroundColor: colors.surfaceHigh,
  },
  appLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
    minWidth: 0,
  },
  appIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceHighest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appText: {
    flex: 1,
    minWidth: 0,
  },
  appName: {
    fontSize: fontSizes.bodyMd,
    lineHeight: 20,
    fontWeight: '600',
    color: colors.text,
  },
  appMeta: {
    fontSize: fontSizes.bodySm,
    lineHeight: 16,
    color: colors.subtext,
  },
  appMetaActive: {
    color: colors.accent,
  },
  reviewBadge: {
    backgroundColor: `${colors.accent}1A`,
    borderRadius: radius.sm,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: spacing.xs,
  },
  reviewText: {
    fontFamily: fonts.mono,
    fontSize: fontSizes.labelBadge,
    lineHeight: 14,
    fontWeight: '600',
    color: colors.accent,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
    backgroundColor: colors.status.done,
    marginRight: spacing.sm,
  },
  menu: {
    marginLeft: spacing.xl,
    marginTop: 6,
    marginBottom: spacing.xs,
    width: 208,
    backgroundColor: colors.surfaceHigh,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    padding: 6,
    gap: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
  },
  menuItemActive: {
    backgroundColor: colors.surfaceHighest,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  menuItemText: {
    fontSize: fontSizes.bodyMd,
    lineHeight: 20,
    color: colors.subtext,
  },
  menuItemTextStrong: {
    fontSize: fontSizes.bodyMd,
    lineHeight: 20,
    fontWeight: '600',
    color: colors.text,
  },
  menuItemDanger: {
    color: colors.status.missed,
  },
  menuSlot: {
    fontFamily: fonts.mono,
    fontSize: 10,
    lineHeight: 14,
    color: colors.subtext,
  },
  menuDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.surfaceHighest,
    marginVertical: 2,
  },
  alphabetRail: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  alphabetLetter: {
    fontFamily: fonts.mono,
    fontSize: 8,
    lineHeight: 9,
    color: colors.subtext,
  },
  alphabetLetterActive: {
    color: colors.accent,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  footerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
    backgroundColor: colors.status.done,
  },
  footerText: {
    fontFamily: fonts.mono,
    fontSize: fontSizes.labelBadge,
    lineHeight: 14,
    color: colors.subtext,
  },
});
