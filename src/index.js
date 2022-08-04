/**
 * *Archivo principal del servidor
 */

const app = require('./app');
const conexion = require('./config/database');
const init = async ()=>{
  await conexion(); 
  app.listen(app.get('PORT'),()=>{
    console.log(`Servidor en puerto ${app.get('PORT')}`);
  });
};

init();