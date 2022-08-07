import { getNameUser } from "../helpers/helpers.js";

export const main = async (req, res) => {
  const names = await getNameUser(req.user);
  res.render("index", { name: names });
};
