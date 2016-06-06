var express = require("express");
var app = express();
var tasks = require("./data/tasks.json");
var bodyParser = require("body-parser");

app.set("views", "./views");
app.set("view engine", "jade");

app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.render("index", {
        title: "Home"
    });
});

app.get('/task-list', function(req, res){
    res.render("task-list", {
        title: "Task list",
        tasks: tasks
    });
});

app.route('/task-list/add').get(function(req, res){
    res.render("add", {
        title: "New task"
    });
}).post(function(req, res){
    var task = {
        id: 6,
        task: req.body.task,
        details: req.body.details
    };

    tasks.push(task);

    res.redirect('/task-list');
});

app.get('/task-list/delete/:id', function(req, res){
    var taskId = req.params.id;
    res.send(taskId);
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});