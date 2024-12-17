const db = require("../util/db");

module.exports = class refunds {
  constructor(
    id,
    email,
    order,
    reasonForRefund,
    reasonForDiscount,
    platform,
    amount,
    tracking,
    description
  ) {
    this.email = email;
    this.order = order;
    this.reasonForRefund = reasonForRefund;
    this.reasonForDiscount = reasonForDiscount || null;
    this.platform = platform;
    this.amount = amount;
    this.tracking = tracking || null;
    this.description = description || null;
  }

  async submitRefund() {
    try {
      await db.execute(
        "INSERT INTO refunds (email, orderNumber, reasonForRefund, reasonForDiscount, platform, amount, tracking, description) VALUES (?,?,?,?,?,?,?,?)",
        [
          this.email,
          this.order,
          this.reasonForRefund,
          this.reasonForDiscount,
          this.platform,
          this.amount,
          this.tracking,
          this.description,
        ]
      );
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
  static async getPosts() {
    try {
      const [rows] = await db.execute("SELECT * FROM refunds");
      return rows; // Returns an array of refunds
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
  static async updateFinished(finished, id) {
    try {
      await db.execute("UPDATE refunds SET finished = ? WHERE id = ?", [
        finished,
        id,
      ]);
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
  static async updateHold(hold, id) {
    try {
      await db.execute("UPDATE refunds SET hold = ? WHERE id = ?", [hold, id]);
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
  static async updateWrong(wrong, id) {
    try {
      await db.execute("UPDATE refunds SET wrong = ? WHERE id = ?", [
        wrong,
        id,
      ]);
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
};
