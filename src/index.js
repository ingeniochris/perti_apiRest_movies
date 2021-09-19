"use strict";

import app from "./app";

const Main = async (app) => {
  try {
    await app.listen(app.get("port"));
    console.log(`
      ################################################
      🛡️  Server running on http://localhost:${app.get("port")} 🛡️
      ################################################
    `);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

Main(app);
