/**
 * *Archivo principal del servidor
 */

import app from "./app.js";

import { connectionDB as conexion} from "./config/database.js";
const init = async () => {
  await conexion();
  app.listen(app.get("PORT"), () => {
    console.log(`Servidor en puerto ${app.get("PORT")}`);
  });
};

init();
