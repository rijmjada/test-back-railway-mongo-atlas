const mongoose = require('mongoose');


const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.ConnectionSTR, {
            useNewUrlParser: true,    // params recomendados por mongoose
            useUnifiedTopology: true  // params recomendados por mongoose
        });

        console.log('Base de datos online');

    } catch (error) {
        throw new Error(`ERROR BASE DE DATOS - ${error}`)
    }
}


module.exports = {
    dbConnection
};