const { getNameUser } = require("../helpers/helpers");
const indexController = {};

indexController.main = async (req, res) => {
  const names = await getNameUser(req.user);
  res.render("index",{name: names});
};

module.exports = indexController;
