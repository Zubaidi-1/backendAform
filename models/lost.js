const db = require("../util/db");

module.exports = class LOST {
  constructor(email, date, orderNo, tracking, lostdamaged, warehouse, image) {
    this.email = email;
    this.date = date;
    this.orderNo = orderNo;
    this.tracking = tracking;
    this.warehouse = warehouse;
    this.lostdamaged = lostdamaged;
    this.image = image;
  }
  async postLost() {
    console.log([
      this.email,
      this.date,
      this.orderNo,
      this.tracking,
      this.warehouse,
      this.lostdamaged,
      this.image,
    ]);

    try {
      await db.execute(
        "INSERT INTO lost (email,date,orderNo,tracking ,warehouse,lostdamaged,image) VALUES (?,?,?,?,?,?,?)",
        [
          this.email,
          this.date,
          this.orderNo,
          this.tracking,
          this.warehouse,
          this.lostdamaged,
          this.image ? this.image : null,
        ]
      );
    } catch (e) {
      throw new Error("DB error: " + e.message);
    }
  }
  static async updateFinished(finished, id) {
    try {
      await db.execute("UPDATE lost SET finished = ? WHERE idlost= ?", [
        finished,
        id,
      ]);
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
  static async updateWrong(wrong, id) {
    try {
      await db.execute("UPDATE lost SET wrong = ? WHERE idlost = ?", [
        wrong,
        id,
      ]);
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
  static async getPosts() {
    try {
      const [rows] = await db.execute("SELECT * FROM lost");
      return rows; // Returns an array of refunds
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
};
