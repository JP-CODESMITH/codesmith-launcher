const { withAndroidManifest } = require('expo/config-plugins');

const MAIN_ACTION = 'android.intent.action.MAIN';
const LAUNCHER_CATEGORY = 'android.intent.category.LAUNCHER';
const HOME_CATEGORIES = ['android.intent.category.HOME', 'android.intent.category.DEFAULT'];

function withLauncher(config) {
  return withAndroidManifest(config, (config) => {
    const manifest = config.modResults.manifest;
    const application = manifest.application?.[0];

    if (!application) {
      throw new Error('withLauncher: AndroidManifest is missing an <application> element.');
    }

    const mainActivity = application.activity?.find(
      (activity) => activity.$?.['android:name'] === '.MainActivity',
    );

    if (!mainActivity) {
      throw new Error('withLauncher: Could not find .MainActivity in AndroidManifest.');
    }

    mainActivity.$['android:launchMode'] = 'singleTask';

    const intentFilters = mainActivity['intent-filter'] ?? [];
    mainActivity['intent-filter'] = intentFilters;

    const mainFilter = intentFilters.find((intentFilter) =>
      intentFilter.action?.some((action) => action.$?.['android:name'] === MAIN_ACTION),
    );

    if (!mainFilter) {
      throw new Error('withLauncher: .MainActivity has no MAIN intent filter.');
    }

    mainFilter.category = mainFilter.category ?? [];

    for (const category of HOME_CATEGORIES) {
      const exists = mainFilter.category.some((item) => item.$?.['android:name'] === category);

      if (!exists) {
        mainFilter.category.push({ $: { 'android:name': category } });
      }
    }

    const queries = manifest.queries ?? [];
    manifest.queries = queries;

    const hasLauncherQuery = queries.some((query) =>
      query.intent?.some(
        (intent) =>
          intent.action?.some((action) => action.$?.['android:name'] === MAIN_ACTION) &&
          intent.category?.some(
            (category) => category.$?.['android:name'] === LAUNCHER_CATEGORY,
          ),
      ),
    );

    if (!hasLauncherQuery) {
      const query = queries[0] ?? { intent: [] };

      if (queries.length === 0) {
        queries.push(query);
      }

      query.intent = query.intent ?? [];
      query.intent.push({
        action: [{ $: { 'android:name': MAIN_ACTION } }],
        category: [{ $: { 'android:name': LAUNCHER_CATEGORY } }],
      });
    }

    return config;
  });
}

module.exports = withLauncher;
