import wompi from "./src/routes/wompi.js";

import loginAdmin from "./src/routes/loginAdmin.js"
import loginCustomer from "./src/routes/loginCustomer.js"
import logout from "./src/routes/logout.js";

import registerAdmin from "./src/routes/registerAdmin.js";
import registerCustomer from "./src/routes/registerCustomer.js";

import ticketPurchase from "./src/routes/ticketPurchase.js";

import cookieParser from "cookie-parser";
import cors from "cors"
import express from "express"

const app = express();

app.use(express.json())

app.use(
    cors({
        origin:["https://localhost:5174"], Credential : true
    })
);

app.use(cookieParser());

app.use("/api/wompi", wompi);

app.use("/api/loginAdmin", loginAdmin);
app.use("/api/loginCustomer", loginCustomer);
app.use("/api/logout", logout);

app.use("/api/registerAdmin", registerAdmin);
app.use("/api/registerCustomer", registerCustomer);

app.use("/api/ticketPurchase", ticketPurchase);

export default app;