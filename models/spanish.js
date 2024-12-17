const db = require("../util/db");

module.exports = class SPANISH {
  constructor(orderNo, phoneNumber, email) {
    this.orderNo = orderNo;
    this.phoneNumber = phoneNumber;
    this.email = email;
  }
  postSpanish = async () => {
    try {
      db.execute(
        "INSERT INTO spanish (orderNo, phoneNumber, email) VALUES (?,?,?)",
        [this.orderNo, this.phoneNumber, this.email]
      );
    } catch (e) {
      throw new Error("DB error: ", e.message);
    }
  };

  static async getPosts() {
    try {
      const [rows] = await db.execute("SELECT * FROM spanish");
      return rows; // Returns an array of refunds
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
  static async updateFinished(finished, id) {
    try {
      await db.execute("UPDATE spanish SET finished = ? WHERE idspanish= ?", [
        finished,
        id,
      ]);
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
  static async updateWrong(wrong, id) {
    try {
      await db.execute("UPDATE spanish SET wrong = ? WHERE idspanish = ?", [
        wrong,
        id,
      ]);
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
};
