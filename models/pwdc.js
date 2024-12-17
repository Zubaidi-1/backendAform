const db = require("../util/db");

module.exports = class PWDC {
  constructor(email, partName, specs) {
    this.email = email;
    this.partName = partName;
    this.specs = specs;
  }
  postPwdc = async () => {
    console.log([this.email, this.partName, this.specs]);

    try {
      await db.execute(
        "INSERT INTO pwdc (email, partName, specs) VALUES (?,?,?)",
        [this.email, this.partName, this.specs]
      );
    } catch (e) {
      throw new Error("DB error: " + e.message);
    }
  };
  static async getPosts() {
    try {
      const [rows] = await db.execute("SELECT * FROM pwdc");
      return rows; // Returns an array of refunds
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
  static async updateFinished(finished, id) {
    try {
      await db.execute("UPDATE pwdc SET finished = ? WHERE idpwdc= ?", [
        finished,
        id,
      ]);
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
  static async updateWrong(wrong, id) {
    try {
      await db.execute("UPDATE pwdc SET wrong = ? WHERE idpwdc = ?", [
        wrong,
        id,
      ]);
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
};
