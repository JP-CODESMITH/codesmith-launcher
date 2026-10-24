# CodeSmith architecture

CodeSmith is an Android-only home-screen launcher built with Expo, TypeScript, and a
development build. This repository is currently a setup scaffold: it renders a blank dark
screen and contains placeholders for the features listed below.

## Stack

- Expo SDK 58 with the React Native new architecture, TypeScript, and `expo-dev-client`
- Zustand for in-memory state
- `expo-sqlite` for on-device persistence
- `date-fns` for date math
- `react-native-svg` for the year grid
- `@gorhom/bottom-sheet`, `react-native-reanimated`, and `react-native-gesture-handler`
  for the day sheet
- `react-native-safe-area-context` for insets
- ESLint and Prettier for linting and formatting

## Folder map

```
src/
  app/          App entry and root layout
  components/   YearGrid, YearCounter, DaySheet, TodayStrip, Dock, AppDrawer
  db/           SQLite client, schema, and migration helper
  store/        Zustand stores
  domain/       Day-status and year-stats types and logic
  native/       TypeScript wrapper for the launcher-apps module
  theme/        Design tokens
modules/
  launcher-apps/  Local Kotlin Expo module for installed apps
plugins/
  withLauncher.js Expo config plugin for the Android launcher intent
docs/
  design/       Stitch screens (drop files here)
```

## Persistence

SQLite database: `codesmith.db`.

`tasks`:

| Column   | Type    | Notes                 |
| -------- | ------- | --------------------- |
| id       | INTEGER | Primary key           |
| date     | TEXT    | Local `yyyy-MM-dd`    |
| title    | TEXT    | Task title            |
| priority | INTEGER | 1-4 (P1-P4)           |
| done     | INTEGER | 0 or 1                |

`pinned_apps`:

| Column       | Type    | Notes                    |
| ------------ | ------- | ------------------------ |
| package_name | TEXT    | Primary key              |
| position     | INTEGER | Dock order               |

`migrateDatabase()` creates the tables and the `tasks(date)` index. It is not called yet.

## Native launcher support

`plugins/withLauncher.js` runs during `expo prebuild` and edits `AndroidManifest.xml`:

- adds `HOME` and `DEFAULT` categories to the main activity's intent filter
- sets the main activity's `launchMode` to `singleTask`
- adds a `<queries>` block for the `MAIN`/`LAUNCHER` intent so installed apps are visible
  on Android 11 and newer

`modules/launcher-apps` is a local Kotlin Expo module autolinked from `modules/`. Its
functions currently return placeholders:

- `getInstalledApps(): Promise<{ label: string; packageName: string }[]>`
- `getAppIcon(packageName: string): Promise<string>` (base64 PNG)
- `launchApp(packageName: string): Promise<boolean>`

Each Kotlin function has a `TODO` describing the real implementation.

## Rendering rules

- A day's colour is always computed from its tasks and today's date when displayed,
  never stored, so it stays correct if the app was closed at midnight.
- Day status:
  - future = plain
  - today = fills green as tasks are ticked
  - past with no tasks = grey
  - all done = green
  - some done = amber
  - none done = red
- Streak = consecutive green days. Days with no tasks do not break it; partial or missed
  days do.
- Everything works offline. No backend, no accounts.

Priority colours are intentionally separate from status colours: P1-P4 never use red or
green because red means missed and green means done on the grid.
