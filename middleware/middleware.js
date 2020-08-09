const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const flash = require('connect-flash')
const MongoDBStore = require("connect-mongodb-session")(session);
const {bindUserWithRequest} = require('./authMiddleware')
const setLocals = require('./setLocals')
const config = require('config')



const store = new MongoDBStore({
  uri: config.get("db-uri"),
  collection: "sessions",
  expires: 1000 * 60 * 60 * 2,
});

const middleware = [
  morgan("dev"),
  express.static("public"),
  express.urlencoded({ extended: true }),
  express.json(),
  session({
    secret: config.get("secret-key") || "SECRET_KEY",
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
  flash(),
  bindUserWithRequest(),
  setLocals(),
];

module.exports = app =>{
    middleware.forEach(m =>{
        app.use(m)
    })
}
