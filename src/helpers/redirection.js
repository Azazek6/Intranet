export const isAdmin = (req, res, next) => {
  if (req.user.rol == "Administrador") {
    return next();
  }
  res.redirect("/");
};
export const isDoctor = (req, res, next) => {
  if (req.user.rol == "Doctor") {
    return next();
  }
  res.redirect("/");
};
export const isReceptionist = (req, res, next) => {
  if (req.user.rol == "Recepcionista") {
    return next();
  }
  res.redirect("/");
};
