const db = require("../util/db");

module.exports = class CONTACT {
  constructor(email, orderNo, phoneNumber, reason) {
    this.email = email;
    this.orderNo = orderNo;
    this.phoneNumber = phoneNumber;
    this.reason = reason;
  }
  async postContact() {
    try {
      await db.execute(
        "INSERT INTO contact (email,orderNo,phoneNumber,reason) VALUES (?,?,?,?)",
        [this.email, this.orderNo, this.phoneNumber, this.reason]
      );
    } catch (e) {
      throw new Error("DB error: " + e.message);
    }
  }
  static async getPosts() {
    try {
      const [rows] = await db.execute("SELECT * FROM contact");
      return rows; // Returns an array of refunds
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
  static async updateFinished(finished, id) {
    try {
      await db.execute("UPDATE contact SET finished = ? WHERE idcontact= ?", [
        finished,
        id,
      ]);
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
  static async updateWrong(wrong, id) {
    try {
      await db.execute("UPDATE contact SET wrong = ? WHERE idcontact = ?", [
        wrong,
        id,
      ]);
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
};
