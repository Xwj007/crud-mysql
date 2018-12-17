var mysql = require('mysql')

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'students'
});
 
console.log(12333)
connection.connect(mysql);
console.log(12333)
// 查询所有
exports.find = function(callback){
	connection.query('SELECT * FROM `stu`',function (err,results,fields) {
		if (err) {
			return callback(err)
		}
		callback(null,results)
	})
} 
// 根据id获取学生信息
exports.findById = function(id,callback){
	connection.query('SELECT * FROM `stu` where id=?',id,function(err,results,fields){
		if (err) {
			return callback(err)
		}
		callback(null,results[0])
	})
}
// 处理添加数据
exports.insert = function(student,callback){
	connection.query('INSERT stu (name,age,hobbies,sex) VALUES(?,?,?,?)',student,function(err,results,fields){
		if (err) {
			return callback(err)
		}
		callback(null)
	})
}

// 处理更新数据
exports.updateById = function (student,callback) {
	connection.query('UPDATE stu SET name = ?,age = ?,hobbies=?,sex=? WHERE Id = ?',student,function (err,results,fields) {
		if (err) {
			return callback(err)
		}
		callback(null)
	})
}

// 处理删除数据
exports.deleteById = function(id,callback){
	connection.query('DELETE FROM stu where id=?',id,function (err,results,fields) {
		if (err) {
			return callback(err)
		}
		callback(null)
	})
}



// module.exports.connection = connection

// connection.end();