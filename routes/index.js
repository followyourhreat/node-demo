var express = require('express');
var router = express.Router();
var db = require("../config/db")
  /* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express2' });
});
router.get('/reg', function(req, res, next) {
  res.render('reg', { title: '用户注册111' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: '用户登录22' });
});
router.get('/log', function(req, res, next) {
  res.render('log', { title: '心情杂感' });
});
router.get('/case', function(req, res, next) {
  res.render('case', { title: '代办事项' });
});



router.get('/user', function(req, res, next) {
  // let user = { username: 'test', password: '123456' };
  let sqlString = 'SElECT * FROM users';
  var connection = db.connection();
  connection.query(sqlString, function(error, results) {
    if (error) throw error;
    str = JSON.stringify(results);
    // data.list = results;
    // console.log(str);
    res.render('user', { list: results });
  });
  db.close(connection);

});

router.post('/user/add', function(req, res, next) {
  // let user = { username: 'test', password: '123456' };
  var username = req.body.username;
  var lesson = req.body.lesson;
  var password = req.body.password;
  var age = req.body.age;
  let sqlString = "INSERT INTO users SET username = " + "'" + username + "'" + ", lesson =" + "'" + lesson + "'" + ", password =" + password + ", age =" + age;
  console.log(sqlString);
  var connection = db.connection();
  connection.query(sqlString, function(error, results) {
    if (error) throw error;
    str = JSON.stringify(results);
    // data.list = results;
    console.log('新增用户成功');
    // res.render('user', { list: results });
    res.redirect('/user')

  });
  db.close(connection);

});

router.get('/user/del', function(req, res) {
  var id = req.query.id;

  let sqlString = "delete from users where id=" + id;
  console.log(sqlString);
  var connection = db.connection();
  connection.query(sqlString, function(err, results) {
    if (err) {
      res.end('删除失败：' + err)
    } else {
      console.log('删除用户成功');
      res.redirect('/user')
    }
  });
  db.close(connection);
});

router.get('/user/edit', function(req, res) {
  var id = req.query.id;
  let sqlString = "select * from users where id=" + id;
  console.log(sqlString);
  var connection = db.connection();
  connection.query(sqlString, function(err, results) {
    if (err) {
      res.end('获取失败：' + err)
    } else {
      console.log('获取用户成功');
      res.render('userEdit', { title: 'Edit Account', data: results });
    }
  });
  db.close(connection);
});

router.post('/user/update', function(req, res) {
  console.log("--------更新中");
  let id = req.body.id;
  let sql = {
    username: req.body.username,
    password: req.body.password,
    age: req.body.age,
    lesson: req.body.lesson
  }
  let sqlString = 'UPDATE users SET username = ' + '"' + sql.username + '"' + ',password = ' + sql.password + ',age = ' + sql.age + ',lesson = ' + '"' + sql.lesson + '" ' + ' WHERE id=' + id;
  console.log(sqlString);
  let connection = db.connection();
  connection.query(sqlString, function(err, results) {
    if (err) {
      res.end('更新失败：' + err)
    } else {
      console.log('更新用户成功');
      res.redirect('/user/edit?id=' + id);
      // res.render('userEdit', { title: 'Edit Account', data: results });

    }
  });
  db.close(connection);
});





module.exports = router;
