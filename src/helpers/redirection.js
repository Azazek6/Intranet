const helpers = {};

helpers.isAdmin = (req, res, next)=>{
  if(req.user.rol == 'Administrador'){
    return next();
  }
  res.redirect('/');
};
helpers.isDoctor = (req, res, next)=>{
  if(req.user.rol == 'Doctor'){
    return next();
  }
  res.redirect('/');
};
helpers.isReceptionist = (req, res, next)=>{
  if(req.user.rol == 'Recepcionista'){
    return next();
  }
  res.redirect('/');
};

module.exports = helpers;