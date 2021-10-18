const { connect } = require("mongoose");
const { DATABASE_CONFIG } = require("../../config");

class DatabaseConnection {
  static async connect() {
    const URL = `mongodb://${DATABASE_CONFIG.HOST}/${DATABASE_CONFIG.NAME}`;
    try {
      return await connect(URL);
    } catch (err) {
      console.log(`[Mongoose] : DatabaseConnection error`, err);
      process.exit(1);
    }
  }
}

module.exports = { DatabaseConnection };
