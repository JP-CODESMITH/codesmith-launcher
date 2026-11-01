import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import AppDrawer from '../components/AppDrawer';
import DaySheet from '../components/DaySheet';
import Dock from '../components/Dock';
import Icon, { type IconName } from '../components/Icon';
import TodayStrip from '../components/TodayStrip';
import YearCounter from '../components/YearCounter';
import YearGrid from '../components/YearGrid';
import { colors, fontSizes, fonts, radius, spacing } from '../theme/tokens';

type Route = 'home' | 'drawer';

const navItems: { name: IconName; route?: Route }[] = [
  { name: 'grid', route: 'home' },
  { name: 'calendar-month' },
  { name: 'terminal', route: 'drawer' },
  { name: 'insights' },
];

function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [route, setRoute] = useState<Route>('home');
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: insets.top }]}>

        {route === 'drawer' ? (
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <Pressable onPress={() => setRoute('home')} style={styles.backButton}>
                <Icon name="arrow-left" size={20} color={colors.subtext} />
              </Pressable>
              <Text style={styles.headerTitle}>App Drawer</Text>
            </View>
            <View style={styles.headerRight}>
              <View style={styles.statusIcons}>
                <Icon name="signal" size={16} color={colors.subtext} />
                <Icon name="wifi" size={16} color={colors.subtext} />
                <Icon name="battery" size={18} color={colors.subtext} />
              </View>
              <View style={styles.avatar}>
                <Icon name="person" size={18} color={colors.bg} />
              </View>
            </View>
          </View>
          ) : (
            // <Text style={styles.clock}>09:41</Text>
            <></>
          )}

      </View>

      {route === 'home' ? (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.banner}>
            <View style={styles.kernel}>
              <View style={styles.liveDot} />
              <Text style={styles.kernelText}>kernel: active</Text>
            </View>
            <View style={styles.epoch}>
              <Icon name="sync" size={15} color={colors.accent} />
              <Text style={styles.epochText}>2026.epoch // d:298</Text>
            </View>
          </View>

          <YearCounter />
          <YearGrid onSelectDay={() => setSheetOpen(true)} />
          <TodayStrip />
          <Dock onOpenDrawer={() => setRoute('drawer')} />
        </ScrollView>
      ) : (
        <AppDrawer />
      )}

      <View style={[styles.bottomArea, { paddingBottom: insets.bottom + spacing.sm }]}>
        <View style={styles.navPill}>
          {navItems.map((item) => {
            const active = item.route === route;
            return (
              <Pressable
                key={item.name}
                onPress={item.route ? () => setRoute(item.route as Route) : undefined}
                style={[styles.navButton, active && styles.navButtonActive]}
              >
                <Icon name={item.name} size={20} color={active ? colors.accent : colors.subtext} />
              </Pressable>
            );
          })}
        </View>
        <View style={styles.homeIndicator} />
      </View>

      {sheetOpen ? <DaySheet onClose={() => setSheetOpen(false)} /> : null}
    </View>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>

        <StatusBar style="light" />
        <HomeScreen />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    backgroundColor: colors.bg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  headerRow: {
    height: 56,
    paddingHorizontal: spacing.margin,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    flex: 1,
    minWidth: 0,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -spacing.sm,
  },
  headerTitle: {
    fontSize: fontSizes.headlineMd,
    lineHeight: 24,
    fontWeight: '600',
    color: colors.text,
  },
  clock: {
    fontFamily: fonts.mono,
    fontSize: fontSizes.labelCode,
    lineHeight: 18,
    fontWeight: '500',
    color: colors.subtext,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.margin,
    paddingTop: spacing.lg,
    paddingBottom: 140,
    gap: spacing.lg,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xs,
  },
  kernel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
    backgroundColor: colors.status.done,
  },
  kernelText: {
    fontFamily: fonts.mono,
    fontSize: fontSizes.labelCode,
    lineHeight: 18,
    fontWeight: '500',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: colors.subtext,
  },
  epoch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  epochText: {
    fontFamily: fonts.mono,
    fontSize: fontSizes.bodySm,
    lineHeight: 16,
    color: colors.subtext,
  },
  bottomArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    paddingHorizontal: spacing.margin,
    paddingTop: spacing.sm,
    backgroundColor: colors.bg,
  },
  navPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: spacing.xs,
    width: '100%',
    maxWidth: 340,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceLow,
    borderWidth: 1,
    borderColor: colors.border,
  },
  navButton: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonActive: {
    backgroundColor: colors.surfaceHigh,
  },
  homeIndicator: {
    width: 96,
    height: 4,
    borderRadius: radius.full,
    backgroundColor: `${colors.subtext}66`,
    marginTop: spacing.sm,
  },
});
