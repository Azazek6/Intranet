//Librerias a usar
import express from "express";
import morgan from "morgan";
import router from "./routes/index.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import exphbs from "express-handlebars";
import flash from "connect-flash";
import session from "express-session";
import { isAdmin, isDoctor, isRecepcionist } from "./helpers/helpers.js";

//Iniciando
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
import passport from "passport";
import "./config/passport.js";

//Configuraciones
app.set("PORT", process.env.PORT || 3000);
app.set("views", join(__dirname, "views"));

const hbs = exphbs.create({
  defaultLayout: "main",
  layoutsDir: join(app.get("views"), "layouts"),
  partialsDir: join(app.get("views"), "partials"),
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
  res.locals.isAdmin = isAdmin(req.user);
  res.locals.isDoctor = isDoctor(req.user);
  res.locals.isReceptionist = isRecepcionist(req.user);
  next();
});

//Rutas del servidor
app.use(router);

//Archivos Estaticos
app.use(express.static(join(__dirname, "public")));

export default app;
