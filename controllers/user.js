const user = require("../models/user");
exports.getUser = async (req, res, next) => {
  try {
    const users = await user.getUsers();
    console.log({ users: users[0] });

    res.status(200).json({ users: users[0] });
  } catch (err) {
    res.status(500).json({ msg: "Couldn't load users" });
  }
};

exports.patchUser = async (req, res, next) => {
  try {
    await user.updateUsers(req.body.role, req.body.email);
    res.status(200).json({ message: "role updated" });
  } catch (err) {
    res.status(500).json({ msg: "Couldn't update users" });
  }
};
