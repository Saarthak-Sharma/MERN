require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require('./router/auth-router');
const contactRoute = require('./router/contact-router');
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middleware/error-middleware");    

// handle cors issue
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}
app.use(cors(corsOptions));

app.use(express.json());//middleware

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRoute);

app.use(errorMiddleware);//errormiddleware

const PORT = 5000;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`The server is running on PORT: ${PORT}`);
    })
});
