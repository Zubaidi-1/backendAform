const db = require("../util/db");

module.exports = class WH {
  constructor(
    email,
    date,
    orderNo,
    partNumber,
    warehouse,
    description,
    issue,
    image
  ) {
    this.email = email;
    this.date = date;
    this.orderNo = orderNo;
    this.partNumber = partNumber;
    this.warehouse = warehouse;
    this.description = description;
    this.issue = issue;
    this.image = image;
  }
  async postWH() {
    console.log([
      this.email,
      this.date,
      this.orderNo,
      this.partNumber,
      this.warehouse,
      this.description,
      this.issue,
      this.image,
    ]);

    try {
      await db.execute(
        "INSERT INTO warehouse (email,date,orderNo,partNumber,warehouse,description,issue,image) VALUES (?,?,?,?,?,?,?,?)",
        [
          this.email,
          this.date,
          this.orderNo,
          this.partNumber,
          this.warehouse,
          this.description,
          this.issue,
          this.image ? this.image : null,
        ]
      );
    } catch (e) {
      throw new Error("DB error: " + e.message);
    }
  }
  static async getPosts() {
    try {
      const [rows] = await db.execute("SELECT * FROM warehouse");
      return rows; // Returns an array of refunds
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
  static async updateFinished(finished, id) {
    try {
      await db.execute(
        "UPDATE warehouse SET finished = ? WHERE idwarehouse= ?",
        [finished, id]
      );
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
  static async updateWrong(wrong, id) {
    try {
      await db.execute("UPDATE warehouse SET wrong = ? WHERE idwarehouse = ?", [
        wrong,
        id,
      ]);
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
};
