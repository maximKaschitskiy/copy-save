const path = require('path')
const os = require('os')
const fs = require("fs")

const getParentFolder = (pathString) => {
  let absolutePath

  if (pathString.startsWith('~/')) {
    absolutePath = path.join(os.homedir(), pathString.slice(2))
  } else if (pathString.startsWith('/')) {
    absolutePath = pathString
  } else {
    absolutePath = path.resolve(pathString)
  }

  const parentFolder = path.dirname(absolutePath)
  return parentFolder
}

const createFolderIfNotExist = (paths) => {
  paths.forEach((item)=> {
      if (!fs.existsSync(item)){
          fs.mkdirSync(item, { recursive: true })
      }
  })
}

module.exports = {
    getParentFolder, createFolderIfNotExist
  }