import mongoose from 'mongoose'

mongoose.connect("mongodb://localhost:27017/graphqlreactdb")
    .then(() => console.log("Base de datos conectada"))
    .catch(error => console.log("Error de conexion: ", error.message))