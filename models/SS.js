const db = require("../util/db");

module.exports = class SS {
  constructor(email, orderNo, RFR, actionTaken, describeAction) {
    this.email = email;
    this.orderNo = orderNo;
    this.RFR = RFR;
    this.actionTaken = actionTaken;
    this.describeAction = describeAction;
  }
  async postSS() {
    console.log([
      this.email,
      this.orderNo,
      this.RFR,
      this.actionTaken,
      this.describeAction,
    ]);

    try {
      await db.execute(
        "INSERT INTO savedsale (email, orderNo, rfr, actionTaken, describeAction) VALUES (?,?,?,?,?)",
        [
          this.email,
          this.orderNo,
          this.RFR,
          this.actionTaken,
          this.describeAction,
        ]
      );
    } catch (e) {
      throw new Error("DB error: " + e.message);
    }
  }
  static async updateFinished(finished, id) {
    try {
      await db.execute(
        "UPDATE savedsale SET finished = ? WHERE idsavedsale= ?",
        [finished, id]
      );
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
  static async updateWrong(wrong, id) {
    try {
      await db.execute("UPDATE savedsale SET wrong = ? WHERE idsavedsale = ?", [
        wrong,
        id,
      ]);
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
  static async getPosts() {
    try {
      const [rows] = await db.execute("SELECT * FROM savedsale");
      return rows; // Returns an array of refunds
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
};
