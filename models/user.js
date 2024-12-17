const db = require("../util/db");
module.exports = class users {
  constructor(id, email, passowrd) {
    this.id = id;
    this.email = email;
    this.password = passowrd;
  }
  async signUp() {
    await db.execute(
      "INSERT INTO users (emailusers, passwordsusers) VALUES (?,?)",
      [this.email, this.password]
    );
  }
  static async getUsers() {
    try {
      const rows = await db.execute("SELECT * FROM users");

      return rows;
    } catch (e) {
      throw new Error("Database error: " + e.message);
    }
  }
  static async updateUsers(role, email) {
    try {
      await db.execute("UPDATE users SET role = ? WHERE emailusers = ?", [
        role,
        email,
      ]);
    } catch (err) {
      throw new Error("DB error" + err.message);
    }
  }
};
