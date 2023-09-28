const multer = require("multer")
const path = require("path")
const fs = require("fs")
const nanoid = require("shortid")
const {
  getParentFolder,
  createFolderIfNotExist,
} = require("../utils/fsHelpers")

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const parentFolder = getParentFolder(req.body.location)
    const destFolder = path.join(parentFolder, "./uploads/")
    createFolderIfNotExist([destFolder])
    callback(null, destFolder)
  },
  filename: (req, file, callback) => {
    callback(null, path.basename(file.originalname, path.extname(file.originalname)) + "_" + nanoid() + path.extname(file.originalname))
  },
})

const upload = multer({
  storage: storage,
  //   fileFilter: fileFilter,
})

const getData = (req, res, next) => {
  // console.log(req)
  upload.fields([{ name: "files" }, { name: "text" }, { name: "location" }])
    (req, res, (err) => {
      // console.log(req)
      if (err) {
        console.log(err);
      }
      // if (req.files) {
      // console.log(req.files)
      // }
      // if (req.text) {
      // console.log(req.text)
      // }
      return next()
    }
  )
}

module.exports = {
  getData,
}
