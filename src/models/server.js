const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const {createServer} = require('http');
const {Server:socketServer} = require('socket.io');
const {sockets} = require('../sockets');
const fileUpload = require("express-fileupload");
const userRoutes = require("../routes/user.routes");
const authRoutes = require("../routes/auth.routes");
const categoriesRoutes = require("../routes/categories.routes")
const productsroutes = require("../routes/products.routes");
const searchRoutes = require("../routes/search.routes");
const uploadRoutes = require("../routes/upload.routes");
const { dbConnection } = require("../database/config");
const insertIntoRole = require("../database/init/role.init");
const insertIntoCategories = require("../database/init/categories.init");
const insertIntoProduct = require("../database/init/product.init");
const insertIntouser = require("../database/init/user.init");

class Server {
  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = new socketServer(this.server);
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      categories: "/api/categories",
      products:"/api/products",
      users: "/api/users",
      search:"/api/search",
      upload:"/api/upload"
    };

    //dbConnection
    this.databaseConnection();
    //middlewares
    this.middlewares();
    //routes
    this.routes();
    //sockets
    this.sockets();
    //inits
    // this.init();
  }

  async databaseConnection() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/',
    createParentPath:true  
    }))
    
    this.app.use(express.static(path.join(__dirname, "../uploads")))
    this.app.use(express.static(path.join(__dirname, "../public")));
  }

  init() {
    insertIntoRole();
    insertIntouser();
    insertIntoCategories()
    insertIntoProduct();
  }

  routes() {
    this.app.use(this.paths.auth, authRoutes);
    this.app.use(this.paths.categories,categoriesRoutes);
    this.app.use(this.paths.products,productsroutes)
    this.app.use(this.paths.search,searchRoutes)
    this.app.use(this.paths.users, userRoutes);
    this.app.use(this.paths.upload,uploadRoutes)
  }

  sockets(){
    sockets(this.io);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`-> Server listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
