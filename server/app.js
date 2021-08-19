if (process.env.NODE_ENV != "production") require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes");
const port = process.env.PORT || 3000;
const errHandler = require("./helper/errHandler.js");
const cors = require("cors");

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use(errHandler);

app.listen(port, () => {
	console.log(`gourmet_tavern app listening at port:${port}`);
});
