var express = require('express') // Express 提供了一种更好的方式 专门用来包装路由的
var db = require('./student-mysql')

var router = express.Router() // 1. 创建一个路由容器

// 2. 把路由都挂载到 router 路由容器中
/*
渲染学生列表页面
*/
router.get('/',function (req,res) {
	db.find(function (err,results) {
		if (err) {
			return res.status(500).send('Server error...')
		}
		res.render('index.html',{
			students:results
		})
	})
})
console.log('router')

/*
 * 渲染添加学生页面
 */
router.get('/students/new',function (req,res) {
	res.render('new.html')
})

/*
 * 处理添加学生
 */
router.post('/students/new',function (req,res) {
	// console.log(req.body)
	var student = [
		req.body.name,
		req.body.age,
		req.body.hobbies,
		req.body.sex
	]
	console.log(student)
	db.insert(student,function(err){
		if (err) {
			return res.status(500).send('Server error...')
		}
		res.redirect('/')
	})
})

/*
 * 渲染编辑学生页面
 */
router.get('/students/edit',function (req,res) {
	var id = req.query.id
	db.findById(id,function(err,results){
		if (err) {
			return res.status(500).send('server error')
		}
		res.render('edit.html',{
			student:results
		})
	})

})
/*
 * 处理编辑学生
 */
router.post('/students/edit',function (req,res) {
	console.log(req.body)
	var student= [
		req.body.name,
		req.body.age,
		req.body.hobbies,
		req.body.sex,
		req.body.id
	]
	db.updateById(student,function (err) {
		if (err) { return res.status(500).send('server error')}
		res.redirect('/')
	})
})

/*
 * 处理删除学生
 */
router.get('/students/delete',function (req,res) {
	var id = [req.query.id]
	db.deleteById(id,function(err){
		if (err) { return res.status(500).send('server error')}
		res.redirect('/')
	})
})

/*导出router*/

module.exports = router
