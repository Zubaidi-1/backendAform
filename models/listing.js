const db = require("../util/db");

module.exports = class listing {
  constructor(
    email,
    orderNo,
    listing,
    description,
    errorType,
    error,
    platform
  ) {
    this.email = email;
    this.orderNo = orderNo;
    this.listing = listing;
    this.description = description;
    this.errorType = errorType;
    this.error = error;
    this.platform = platform;
  }
  async postListing() {
    console.log([
      this.email,
      this.orderNo,
      this.listing,
      this.description,
      this.errorType,
      this.error,
      this.platform,
    ]);

    try {
      await db.execute(
        "INSERT INTO listing (email,orderNo,listing,description,errorType,error,platform) VALUES (?,?,?,?,?,?,?)",
        [
          this.email,
          this.orderNo,
          this.listing,
          this.description,
          this.errorType,
          this.error,
          this.platform,
        ]
      );
    } catch (e) {
      throw new Error("DB error: " + e.message);
    }
  }
  static async getPosts() {
    try {
      const [rows] = await db.execute("SELECT * FROM listing");
      return rows; // Returns an array of refunds
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
  static async updateFinished(finished, id) {
    try {
      await db.execute("UPDATE listing SET finished = ? WHERE idlisting= ?", [
        finished,
        id,
      ]);
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
  static async updateWrong(wrong, id) {
    try {
      await db.execute("UPDATE listing SET wrong = ? WHERE idlisting = ?", [
        wrong,
        id,
      ]);
    } catch (err) {
      throw new Error("Database error: " + err.message);
    }
  }
};
