import db from "#db/client";

/** Saves new caravan with its starting supplies (water, salt, camels, gold, guide) and returns the caravan */

export async function createCaravan(name, camels, water, gold, hasGuide) {
  const sql = `
    INSERT INTO caravans
        (name, camels, water, gold, has_guide)
        VALUES
        ($1, $2, $3, $4, $5)
        RETURNING *
        `;

  const {
    rows: [caravan],
  } = await db.query(sql, [name, camels, water, gold, hasGuide]);

  return caravan;
}
