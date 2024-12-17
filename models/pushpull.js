const db = require("../util/db");

module.exports = class PP {
  constructor(email, order, partNumber, reman, warehouse, pushpull, tracking) {
    this.email = email;
    this.order = order;
    this.partNumber = partNumber;
    this.reman = reman;
    this.warehouse = warehouse;
    this.pushpull = pushpull;
    this.tracking = tracking;
  }
  async postPushPull() {
    try {
      await db.execute(
        "INSERT INTO pushpull (email, orderNo, partNumber, reman, warehouse, pushpull, tracking) VALUES (?,?,?,?,?,?,?)",
        [
          this.email,
          this.order,
          this.partNumber,
          this.reman,
          this.warehouse,
          this.pushpull,
          this.tracking ? this.tracking : null,
        ]
      );
    } catch (e) {
      throw new Error("db error" + e.message);
    }
  }
  static async getPosts() {
    try {
      const [rows] = await db.execute("SELECT * FROM pushpull");
      return rows; // Returns an array of refunds
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
  static async updateFinished(finished, id) {
    try {
      await db.execute("UPDATE pushpull SET finished = ? WHERE idpushpull= ?", [
        finished,
        id,
      ]);
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
  static async updateWrong(wrong, id) {
    try {
      await db.execute("UPDATE pushpull SET wrong = ? WHERE idpushpull = ?", [
        wrong,
        id,
      ]);
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
};
