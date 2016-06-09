var express = require("express");
var app = express();
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

var taskListRouter = require("./task");
app.use(taskListRouter);

var taskListApiRouter = require("./api/task");
app.use(taskListApiRouter);

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});