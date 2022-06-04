// import express
const express = require('express')
const server = require('./server')
// import router
const router = express.Router()
// import fs promises
const fsPromises = require('fs').promises
// export router
module.exports = router
const path = require('path')
const filepath = path.join(__dirname, 'data.json')

//home route

router.get('/home', async (req, res) => {
  try {
    let rawData = await fsPromises.readFile(filepath, 'utf-8')
    let data = JSON.parse(rawData)

    res.render('home', data)
  } catch (err) {
    console.error('get home request invalid ', err)
  }
})

router.get('/home/selected/:id', async (req, res) => {
  try {
    let rawData = await fsPromises.readFile(filepath, 'utf-8')
    let data = JSON.parse(rawData)

    let matchData = data.users.find(
      (users) => users.id === Number(req.params.id)
    )
    // const viewdata = {
    //   id: matchData.id,
    //   name: matchData.name,
    //   list: matchData.list,
    // }
     res.render('selected', matchData)
  } catch (err) {
    console.error('get selected request invalid ', err)
  }
})

router.post('/home/selected/:id', async (req, res) => {
  //get data in from data.json then parse it
  try {
    let rawData = await fsPromises.readFile(filepath, 'utf-8')
    let data = JSON.parse(rawData)
    //matchData
    let matchData = data.users.find(
      (users) => users.id === Number(req.params.id)
    )
    //returns whole object of 1 user

    //update matchData with user input
    matchData.list = [...matchData.list, req.body.newItem]
    console.log(data)
    let updatedUser = data.users.forEach((user) => {
      if (user.id == req.params.id) {
        user.id = matchData.id
        user.name = matchData.name
        user.list = matchData.list
      }
      console.log(user)
    })

    console.log('matchData.list', matchData.list)
    //stringify matchData
    let updatedList = JSON.stringify(data, null, 2)

    await fsPromises.writeFile('./data.json', updatedList, 'utf-8')

    console.log(matchData)

    return res.redirect('/home/selected/' + req.params.id)
  } catch (err) {
    console.error('error')
  }
})
