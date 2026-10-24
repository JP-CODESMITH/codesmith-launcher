export const DATABASE_NAME = 'codesmith.db';

export const CREATE_TASKS_TABLE = `
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    title TEXT NOT NULL,
    priority INTEGER NOT NULL CHECK (priority BETWEEN 1 AND 4),
    done INTEGER NOT NULL DEFAULT 0 CHECK (done IN (0, 1))
  );
`;

export const CREATE_TASKS_DATE_INDEX = `
  CREATE INDEX IF NOT EXISTS tasks_date_idx ON tasks (date);
`;

export const CREATE_PINNED_APPS_TABLE = `
  CREATE TABLE IF NOT EXISTS pinned_apps (
    package_name TEXT PRIMARY KEY NOT NULL,
    position INTEGER NOT NULL
  );
`;
