import { requireNativeModule } from 'expo';

import type { InstalledApp } from './LauncherApps.types';

type LauncherAppsNativeModule = {
  getInstalledApps(): Promise<InstalledApp[]>;
  getAppIcon(packageName: string): Promise<string>;
  launchApp(packageName: string): Promise<boolean>;
};

const LauncherApps = requireNativeModule<LauncherAppsNativeModule>('LauncherApps');

export function getInstalledApps(): Promise<InstalledApp[]> {
  return LauncherApps.getInstalledApps();
}

export function getAppIcon(packageName: string): Promise<string> {
  return LauncherApps.getAppIcon(packageName);
}

export function launchApp(packageName: string): Promise<boolean> {
  return LauncherApps.launchApp(packageName);
}
