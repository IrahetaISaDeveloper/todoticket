import wompi from "./src/routes/wompi";

import loginAdmin from "./src/routes/loginAdmin.js"
import loginCustomer from "./src/routes/loginCustomer.js"
import logout from "./src/routes/logout.js";

import registerAdmin from "./src/routes/registerAdmin.js";
import registerCustomer from "./src/routes/registerCustomer.js";

import ticketPurchase from "./src/routes/ticketPurchase.js";
import cookieParser from "cookie-parser";

const app = express();

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
app.use("/registerCustomer", registerCustomer);

app.use("/api/ticketPurchase", ticketPurchase);