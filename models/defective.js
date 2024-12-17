const db = require("../util/db");

module.exports = class DEF {
  constructor(email, orderNo, partNumber, warehouse, description, image) {
    this.email = email;
    this.orderNo = orderNo;
    this.partNumber = partNumber;
    this.warehouse = warehouse;
    this.description = description;
    this.image = image;
  }
  async postDEF() {
    console.log([
      this.email,
      this.orderNo,
      this.warehouse,
      this.description,
      this.image,
    ]);

    try {
      await db.execute(
        "INSERT INTO defective (email,orderNo , partNumber,warehouse,description,image) VALUES (?,?,?,?,?,?)",
        [
          this.email,
          this.orderNo,
          this.partNumber,
          this.warehouse,
          this.description,
          this.image ? this.image : null,
        ]
      );
    } catch (e) {
      throw new Error("DB error: " + e.message);
    }
  }
  static async getPosts() {
    try {
      const [rows] = await db.execute("SELECT * FROM defective");
      return rows; // Returns an array of refunds
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
  static async updateFinished(finished, id) {
    try {
      await db.execute(
        "UPDATE defective SET finished = ? WHERE iddefective= ?",
        [finished, id]
      );
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
  static async updateWrong(wrong, id) {
    try {
      await db.execute("UPDATE defective SET wrong = ? WHERE iddefective = ?", [
        wrong,
        id,
      ]);
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
};
