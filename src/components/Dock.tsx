import { Pressable, StyleSheet, View } from 'react-native';

import Icon, { type IconName } from './Icon';
import { colors, radius, spacing } from '../theme/tokens';

type DockApp = {
  name: string;
  icon: IconName;
  accent?: boolean;
};

const dockApps: DockApp[] = [
  { name: 'Phone Dialer', icon: 'phone' },
  { name: 'Developer Messages', icon: 'terminal' },
  { name: 'Web Browser', icon: 'globe' },
  { name: 'Code Repository', icon: 'code' },
  { name: 'All Apps Drawer', icon: 'apps', accent: true },
];

type Props = {
  onOpenDrawer?: () => void;
};

export default function Dock({ onOpenDrawer }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.dock}>
        {dockApps.map((app) => (
          <Pressable
            key={app.name}
            onPress={app.accent ? onOpenDrawer : undefined}
            style={[styles.button, app.accent ? styles.accentButton : styles.defaultButton]}
          >
            <Icon
              name={app.icon}
              size={app.accent ? 22 : 20}
              color={app.accent ? colors.bg : colors.text}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    paddingTop: spacing.xs,
  },
  dock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 340,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceHigh,
    borderWidth: 1,
    borderColor: colors.border,
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultButton: {
    backgroundColor: colors.surface,
  },
  accentButton: {
    backgroundColor: colors.accent,
  },
});
