import db from '../../db.js';

export const addTimeline = (req, res) => {
    const { driverId, date, events } = req.body;

    if (!driverId || !date || !Array.isArray(events)) {
        return res.status(400).json({ error: 'Invalid payload' });
    }

    db.serialize(() => {
        db.run(
            `DELETE FROM timelines WHERE driver_id = ? AND date = ?`,
            [driverId, date]
        );

        const stmt = db.prepare(`
      INSERT INTO timelines (driver_id, date, start_time, event_type)
      VALUES (?, ?, ?, ?)
    `);
        events.forEach(e => {
            stmt.run(driverId, date, e.startTime, e.eventType);
        });

        stmt.finalize();

        return res.json({ success: true });
    })
}

export const fetchTimeline = (req, res) => {
    const { driverId, date } = req.query;
    db.all(
        `SELECT start_time, event_type
     FROM timelines
     WHERE driver_id = ? AND date = ?
     ORDER BY start_time`,
        [driverId, date],
        (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        }
    );
}