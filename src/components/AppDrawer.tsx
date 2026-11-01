import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  AppState,
  Image,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import Icon from './Icon';
import { ExpoAndroidAppList, type AndroidAppListPackage } from 'expo-android-app-list';
import { openApplication } from 'expo-intent-launcher';
import { colors, fontSizes, fonts, radius, spacing } from '../theme/tokens';

type AppSection = {
  title: string;
  data: AndroidAppListPackage[];
};

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');

// Icons are expensive to generate, so keep them for the lifetime of the screen.
const iconCache = new Map<string, string>();

function groupApps(apps: AndroidAppListPackage[]): AppSection[] {
  const groups = new Map<string, AndroidAppListPackage[]>();

  for (const app of apps) {
    const first = app.appName.trim().charAt(0).toUpperCase();
    const letter = /[A-Z]/.test(first) ? first : '#';
    const group = groups.get(letter) ?? [];
    group.push(app);
    groups.set(letter, group);
  }

  return [...groups.entries()]
    .sort(([a], [b]) => (a === '#' ? 1 : b === '#' ? -1 : a.localeCompare(b)))
    .map(([title, data]) => ({
      title,
      data: data.sort((a, b) => a.appName.localeCompare(b.appName)),
    }));
}

function AppRow({ app }: { app: AndroidAppListPackage }) {
  const [icon, setIcon] = useState(() => iconCache.get(app.packageName));

  useEffect(() => {
    // The state initializer above already used the cache when it was warm.
    if (iconCache.has(app.packageName)) return;

    let alive = true;

    ExpoAndroidAppList.getAppIcon(app.packageName)
      .then((base64) => {
        if (!base64) return;
        iconCache.set(app.packageName, base64);
        if (alive) setIcon(base64);
      })
      .catch(() => {
        // Keep the placeholder icon if the app has no readable icon.
      });

    return () => {
      alive = false;
    };
  }, [app.packageName]);

  return (
    <Pressable
      onPress={() => {
        try {
          openApplication(app.packageName);
        } catch {
          // The package may not have a launcher activity.
        }
      }}
      style={({ pressed }) => [styles.appRow, pressed && styles.appRowPressed]}
    >
      <View style={styles.appLeft}>
        <View style={styles.appIcon}>
          {icon ? (
            <Image source={{ uri: `data:image/png;base64,${icon}` }} style={styles.appIconImage} />
          ) : (
            <Icon name="apps" size={22} color={colors.subtext} />
          )}
        </View>
        <View style={styles.appText}>
          <Text style={styles.appName} numberOfLines={1}>
            {app.appName}
          </Text>
          <Text style={styles.appMeta} numberOfLines={1}>
            {app.packageName}
          </Text>
        </View>
      </View>
      <Icon name="arrow-right" size={18} color={colors.border} />
    </Pressable>
  );
}

export default function AppDrawer() {
  const [apps, setApps] = useState<AndroidAppListPackage[]>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  // Load once when the drawer opens, and again whenever reloadKey changes.
  useEffect(() => {
    let alive = true;

    ExpoAndroidAppList.getAll()
      .then((installed) => {
        if (!alive) return;
        setApps(
          installed.filter(
            (app) => app.appName.trim().length > 0 && app.packageName !== 'com.codesmith.launcher',
          ),
        );
        setStatus('ready');
        setError('');
      })
      .catch((e) => {
        if (!alive) return;
        setStatus('error');
        setError(e instanceof Error ? e.message : 'Could not load installed apps');
      });

    return () => {
      alive = false;
    };
  }, [reloadKey]);

  // Refresh when the launcher comes back to the front so new installs appear.
  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') setReloadKey((key) => key + 1);
    });

    return () => sub.remove();
  }, []);

  const sections = useMemo(() => {
    const search = query.trim().toLowerCase();
    const filtered = search
      ? apps.filter(
          (app) =>
            app.appName.toLowerCase().includes(search) ||
            app.packageName.toLowerCase().includes(search),
        )
      : apps;

    return groupApps(filtered);
  }, [apps, query]);

  const availableLetters = useMemo(
    () => new Set(sections.map((section) => section.title)),
    [sections],
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <View style={styles.searchLeft}>
          <Icon name="search" size={18} color={colors.subtext} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search apps or commands..."
            placeholderTextColor={colors.subtext}
            style={styles.searchInput}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.searchRight}>
          <View style={styles.shortcut}>
            <Text style={styles.shortcutText}>⌘K</Text>
          </View>
          <Icon name="mic" size={18} color={colors.subtext} />
        </View>
      </View>

      <View style={styles.body}>
        <SectionList<AndroidAppListPackage, AppSection>
          sections={sections}
          keyExtractor={(item) => item.packageName}
          renderItem={({ item }) => <AppRow app={item} />}
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionLetter}>{section.title}</Text>
              <View style={styles.sectionRule} />
              <Text style={styles.sectionCount}>{section.data.length} APPS</Text>
            </View>
          )}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
          initialNumToRender={12}
          windowSize={5}
          removeClippedSubviews
          ListEmptyComponent={
            status === 'loading' ? (
              <View style={styles.state}>
                <ActivityIndicator color={colors.accent} />
                <Text style={styles.stateText}>Indexing installed apps...</Text>
              </View>
            ) : status === 'error' ? (
              <View style={styles.state}>
                <Icon name="info" size={22} color={colors.status.missed} />
                <Text style={styles.stateText}>{error}</Text>
                <Pressable
                  onPress={() => {
                    setStatus('loading');
                    setReloadKey((key) => key + 1);
                  }}
                  style={styles.retryButton}
                >
                  <Text style={styles.retryText}>Retry</Text>
                </Pressable>
              </View>
            ) : (
              <View style={styles.state}>
                <Icon name="search" size={22} color={colors.subtext} />
                <Text style={styles.stateText}>
                  {query.trim() ? `No apps match “${query.trim()}”` : 'No apps installed'}
                </Text>
              </View>
            )
          }
        />

        <View style={styles.alphabetRail}>
          {alphabet.map((letter) => (
            <Text
              key={letter}
              style={[
                styles.alphabetLetter,
                availableLetters.has(letter) && styles.alphabetLetterPresent,
              ]}
            >
              {letter}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <View style={styles.liveDot} />
          <Text style={styles.footerText}>{apps.length} APPS INDEXED</Text>
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
  searchInput: {
    flex: 1,
    padding: 0,
    fontSize: fontSizes.bodyMd,
    lineHeight: 20,
    color: colors.text,
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
    gap: spacing.xs,
    paddingBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: 4,
    paddingTop: spacing.sm,
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
  appRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.xs,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceContainer,
  },
  appRowPressed: {
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
    overflow: 'hidden',
  },
  appIconImage: {
    width: 32,
    height: 32,
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
    fontFamily: fonts.mono,
    fontSize: 10,
    lineHeight: 14,
    color: colors.subtext,
  },
  state: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  stateText: {
    fontSize: fontSizes.bodyMd,
    lineHeight: 20,
    textAlign: 'center',
    color: colors.subtext,
  },
  retryButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceHigh,
  },
  retryText: {
    fontFamily: fonts.mono,
    fontSize: fontSizes.labelCode,
    fontWeight: '600',
    color: colors.accent,
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
    color: colors.border,
  },
  alphabetLetterPresent: {
    color: colors.subtext,
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
