let content = require('../content-strings.json')
const fs = require('fs')

const getContent = () => {
  return content
}

const newContent = data => {
  const stringContent = JSON.stringify(data)

  fs.writeFile('../content-strings.json', stringContent, (err) => {
    if (err) {
      console.log(`Couldn't write new content to file: ${err}`)
      throw new Error('Couldn\'t write new content to file')
    } else {
      content = { content: 'data' }
    }
  })

  return data
}

module.exports = { getContent, newContent }