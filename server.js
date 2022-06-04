// import express & handlebars
const express = require('express')
const hbs = require('express-handlebars')
// import route
const routes = require('./routes')
// create express server
const server = express()
// handlebars config
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
// server config
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// export server
module.exports = server

// routes config
server.use('/', routes)

//home routes

server.get('/', (req, res) => {
  // res.render('home')
  res.redirect('/home')
})
