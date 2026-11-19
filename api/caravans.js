import express from "express";
const router = express.Router();
export default router;

import { createCaravan } from "#db/queries/caravans";
import requireBody from "#middleware/requireBody";

/**Validates the caravan setup, calculates remaining gold, and saves the caravan values for supplies and guide */
router
  .route("/")
  .post(
    requireBody(["name", "camels", "water", "hasGuide"]),
    async (req, res) => {
      const { name, camels, water, hasGuide } = req.body;

      if (!name) {
        return res.status(400).send("You must enter a caravan name.");
      }

      if (camels !== 2 && camels !== 3) {
        return res
          .status(400)
          .send("You must choose to bring either 2 or 3 camels.");
      }

      if (!Number.isInteger(water) || water < 0) {
        return res
          .status(400)
          .send("You must enter a whole number of 0 or higher for Water.");
      }

      if (hasGuide !== true && hasGuide !== false) {
        return res.status(400).send("Guide selection must be true or false");
      }

      const cargoCapacity = camels * 10;

      if (water > cargoCapacity) {
        return res
          .status(400)
          .send("You have too much water and are over cargo capacity");
      }

      const startingGold = 50;
      const camelCost = camels * 10;
      const waterCost = water;
      const guideCost = hasGuide ? 8 : 0;

      const gold = startingGold - camelCost - waterCost - guideCost;

      if (gold < 0) {
        return res
          .status(400)
          .send(
            "You do not have enough gold to purchase these supplies. Try changing your purchase amounts.",
          );
      }

      const caravan = await createCaravan(name, camels, water, gold, hasGuide);
      res.status(201).send(caravan);
    },
  );
