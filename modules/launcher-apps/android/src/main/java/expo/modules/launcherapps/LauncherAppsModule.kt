package expo.modules.launcherapps

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class LauncherAppsModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("LauncherApps")

    AsyncFunction("getInstalledApps") {
      // TODO: query PackageManager for every app with a MAIN/LAUNCHER activity.
      emptyList<Map<String, String>>()
    }

    AsyncFunction("getAppIcon") { packageName: String ->
      // TODO: load the app icon for packageName and return it as a base64 PNG.
      ""
    }

    AsyncFunction("launchApp") { packageName: String ->
      // TODO: start the MAIN/LAUNCHER activity for packageName.
      false
    }
  }
}
