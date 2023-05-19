const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../databse/config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.productoPath = '/api/productos';
        this.usuarioPath = '/api/usuarios';


        //Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }


    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        // Policy CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.productoPath, require('../routes/producto-route'));
        this.app.use(this.usuarioPath, require('../routes/usuario-route'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server run in port: ${this.port}`);
        });
    }
}

module.exports = Server;
