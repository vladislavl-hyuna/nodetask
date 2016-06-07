var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'V@ld1s81',
    database: 'nj_task_list_db'
});

connection.connect (function(err) {
    if (err) {
        console.log("Database connection error ...");
    } else {
        console.log("Database is connected ...");
    }
});

var tasks = {
    list: function(callback) {
        connection.query('SELECT * FROM tasks ORDER BY is_complete ASC', callback);
    },
    add: function(task, callback) {
        connection.query('INSERT INTO tasks SET ?', task, callback);
    },
    change: function(id, task, callback) {
        var sql = 'UPDATE tasks SET task = ?, details = ? WHERE id = ?';
        connection.query(sql, [
            task.task,
            task.details,
            parseInt(id)
        ], callback);
    },
    complete: function(id, callback) {
        connection.query('UPDATE tasks SET is_complete = 1 WHERE id = ?', id, callback);
    },
    delete: function(id, callback) {
        connection.query('DELETE FROM tasks WHERE id = ?', id, callback);
    },
    view: function(id, callback) {
        connection.query('SELECT * FROM tasks WHERE id = ? LIMIT 1', id, callback);
    },
};

module.exports = tasks;