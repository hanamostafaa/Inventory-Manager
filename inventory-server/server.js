import express from "express";
import bodyParser from "body-parser";
import cors from "cors";


import router from "./Routers/UserRouter.js";
import inv_router from "./Routers/InventoryRouter.js";


const app = express();
app.use(express.json());
const port = 8080;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin: '*'}));

// Using routes
app.use("/user", router);
app.use("/inventory", inv_router);


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from all origins (not recommended for production)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Define the HTTP methods allowed
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Define the allowed headers
    next();
});


app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});

