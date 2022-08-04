const moongose = require("mongoose");

const connectionDB = async () => {
  try {
    const connection = await moongose.connect(
      "mongodb://Azazek:Nololinolife6@intranet-shard-00-00.44fio.mongodb.net:27017,intranet-shard-00-01.44fio.mongodb.net:27017,intranet-shard-00-02.44fio.mongodb.net:27017/?ssl=true&replicaSet=atlas-z3198g-shard-0&authSource=admin&retryWrites=true&w=majority"
    );
    console.log("Conectado a la base de datos en ", connection.connection.host);
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectionDB;
