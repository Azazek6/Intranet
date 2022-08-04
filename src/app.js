//Librerias a usar
const express = require("express");
const morgan = require("morgan");
const routeMain = require("./routes/main.route");
const routeAuth = require("./routes/auth.route");
const routeAdmin = require("./routes/admin.route");
const routeDoctor = require("./routes/doctor.route");
const routeReceptionist = require("./routes/reception.route");
const exphbs = require("express-handlebars");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const helpers = require("./helpers/helpers");

//Iniciando
const app = express();
const passport = require("passport");
require("./config/passport");

//Configuraciones
app.set("PORT", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));

const hbs = exphbs.create({
  defaultLayout: "main",
  layoutsDir: path.join(app.get("views"), "layouts"),
  partialsDir: path.join(app.get("views"), "partials"),
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    // allowProtoMethodsByDefault: true
  },
  extname: ".hbs",
  helpers: {
    verify: (arg1, arg2, options) => {
      return arg1 == arg2 ? options.fn(this) : options.inverse(this);
    },
  },
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(
  session({
    secret: "secret_app",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Configuraciones Globales
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  res.locals.isAdmin = helpers.isAdmin(req.user);
  res.locals.isDoctor = helpers.isDoctor(req.user);
  res.locals.isReceptionist = helpers.isRecepcionist(req.user);
  next();
});

//Rutas del servidor
app.use(routeMain); //ruta principal
app.use("/auth", routeAuth); //ruta ingreso
app.use("/admin", routeAdmin); //ruta administrador
app.use("/doctor", routeDoctor); //ruta doctor
app.use("/receptionist", routeReceptionist); //ruta recepcionista

//Archivos Estaticos
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
