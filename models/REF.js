const db = require("../util/db");
module.exports = class Ref {
  constructor(email, orderNo, RFR) {
    this.email = email;
    this.orderNo = orderNo;
    this.RFR = RFR;
  }
  async postRef() {
    try {
      await db.execute("INSERT INTO ref (email, orderNo, rfr) VALUES (?,?,?)", [
        this.email,
        this.orderNo,
        this.RFR,
      ]);
    } catch (e) {
      throw new Error("DB error: " + e.message);
    }
  }
  static async getPosts() {
    try {
      const [rows] = await db.execute("SELECT * FROM ref");
      return rows; // Returns an array of refunds
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
  static async updateFinished(finished, id) {
    try {
      await db.execute("UPDATE ref SET finished = ? WHERE idref= ?", [
        finished,
        id,
      ]);
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
  static async updateWrong(wrong, id) {
    try {
      await db.execute("UPDATE ref SET wrong = ? WHERE idref = ?", [wrong, id]);
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
};
