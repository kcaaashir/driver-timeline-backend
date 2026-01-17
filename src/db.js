import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./timeline.db", () => {
  console.log("SQLite database connected");
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS timelines (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      driver_id TEXT NOT NULL,
      date TEXT NOT NULL,
      start_time TEXT NOT NULL,
      event_type TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_timeline
    ON timelines (driver_id, date, start_time)
  `);
});

export default db;