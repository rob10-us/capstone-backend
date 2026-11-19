import db from "#db/client";
import { createUser } from "#db/queries/users";
import { createCaravan } from "#db/queries/caravans";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

/** create sample user and caravan -- not sure about actually using accounts yet might change--  */
async function seed() {
  await createUser("foo", "bar");

  const caravan = await createCaravan("Camel Champions", 2, 8, 14, true);
}
