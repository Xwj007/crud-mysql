var express = require('express')
var router = require('./router')
var bodyParser = require('body-parser')
var path = require('path')
var app = express()


app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))
// app.use('/node_modules/',express.static('./node_modules'))
// app.use('/public/',express.static('./public'))


app.engine('html', require('express-art-template'))//修改art——html

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.get('/',function(req,res){
// 	fs.readFile('./db.json','utf8',function(err,data){
// 		if (err) {
// 			return res.status(500).send('ERROR')
// 		}
// 		var students = JSON.parse(data).students
// 		res.render('index.html',{
// 			students:students
// 		})
// 	})
// })

app.use(router)

app.listen(3000,'0.0.0.0',function () {
	console.log('server is running 3000')
})

module.exports = app
