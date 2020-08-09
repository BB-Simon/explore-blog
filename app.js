require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");

const setMiddleware = require("./middleware/middleware");
const setRoutes = require("./routes/routes");

const app = express();

// Setup View Engine
app.set("view engine", "ejs");
app.set("views", "views");

// Using middleware from middleware directory
setMiddleware(app);
// Using routes from route directory
setRoutes(app);

app.use((req, res, next) => {
  let error = new Error("404 - Page Not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  if (error.status === 404) {
    return res.render("pages/error/404.ejs", {
      title: "404 Page Not Found",
      flashMessage: {},
    });
  }
  console.log(chalk.bgWhite.yellow.inverse(error.message));
  console.log(error);
  res.render("pages/error/500.ejs", { flashMessage: {} });
});

const PORT = process.env.PORT || 8080;
mongoose
  .connect(config.get("db-uri"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(chalk.green.inverse("Database connected"));
    app.listen(PORT, () => {
      console.log(
        chalk.yellowBright.inverse(
          `Server is running in ${config.get("mode")} mode on port ${PORT}`
        )
      );
    });
  })
  .catch((e) => {
    console.log(e);
  });
