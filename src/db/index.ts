import * as SQLite from 'expo-sqlite';

import {
  CREATE_PINNED_APPS_TABLE,
  CREATE_TASKS_DATE_INDEX,
  CREATE_TASKS_TABLE,
  DATABASE_NAME,
} from './schema';

export const db = SQLite.openDatabaseSync(DATABASE_NAME);

export function migrateDatabase(): void {
  db.execSync([CREATE_TASKS_TABLE, CREATE_TASKS_DATE_INDEX, CREATE_PINNED_APPS_TABLE].join('\n'));
}
