const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'todo_app'
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err.stack || err);
    return;
  }
  console.log('MySQL connected as id', connection.threadId);
});

router.get('/', function (req, res, next) {
  connection.query(
    'select * from tasks;',
    (error, results) => {
      if (error) {
        return next(error);
      }
      res.render('index', {
        title: 'ToDo App',
        todos: results,
      });
    }
  );
});

router.post('/', function (req, res, next) {
  const todo = req.body.add;
  connection.query(
    'insert into tasks (user_id, content) values (1, ?);',
    [todo],
    (error, results) => {
      if (error) {
        return next(error);
      }
      res.redirect('/');
    }
  );
});

module.exports = router;
