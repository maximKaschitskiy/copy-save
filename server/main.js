const express = require("express")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const bodyParser = require("body-parser")
const app = express()
const PORT = 3010

const { cors } = require("./middlewares/cors")
const { getData } = require("./middlewares/multer")

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.use(cors)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.post("/file", 
  getData,
  (req, res) => {
    let files = null
    if (JSON.stringify(req.files) !== '{}') {
      files = req.files.files.map(item => item.path)
    }
    return res.status(200).json({ 
      files: files,
    })
    res.end()
  }
)

app.use((err, req, res, next) => {
  if (err) {
    console.log(err)
    res.status(500).json({ message: 'Server error' })
  }
})
