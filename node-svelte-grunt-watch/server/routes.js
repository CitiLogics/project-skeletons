var m = require('./model.js')
const bodyParser = require('body-parser')

module.exports = function(app) {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: false}))

  app.get('/', (req,res) => res.send('ROOT LEVEL ATTAINED'))

  app.get('/hello', (req,res) => {
    res.send(m.getHello())
  })

  app.get('/foo', (req,res) => {
    res.send(m.getFoo())
  }) // /tags

}
