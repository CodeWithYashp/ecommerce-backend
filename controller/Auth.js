const { User } = require("../model/User");

exports.createUser = async (req, res) => {
  //We have to get this product from API body
  const user = new User(req.body);
  try {
    const doc = await user.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.loginUser = async (req, res) => {
  //We have to get this product from API body
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).json({ message: "User Not Found!" });
    } else if (user.password === req.body.password) {
      res
        .status(201)
        .json({
          id: user.id,
          email: user.email,
          name: user.name,
          addresses: user.addresses,
        });
    } else {
      res.status(401).json({ message: "Credentials do not match" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
