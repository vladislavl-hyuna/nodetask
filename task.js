var express = require("express");

var tasks = require("./models/task.js");

var router = express.Router();
module.exports = router;

router.get('/task-list', function(req, res){
    tasks.list(function(err,result) {
        res.render("task-list", {
            title: "Task list",
            tasks: result
        });
        console.log(result);
    });
});

router.route('/task-list/add')
    .get(function(req, res){
        res.render("add", {
            title: "New task"
        });
    })
    .post(function(req, res){
        tasks.add({
            task: req.body.task,
            details: req.body.details,
            is_complete: 0
        }, function(err) {
            if (err) {
                console.log(err);
                return;
            }
            res.redirect('/task-list');
        });
    });

router.get('/task-list/delete/:id', function(req, res){
    tasks.delete(req.params.id, function(err) {
        if (err) {
            console.log(err);
        }
        res.redirect('/task-list');
    });
});

router.get('/task-list/complete/:id', function(req, res){
    tasks.complete(req.params.id, function(err) {
        if (err) {
            console.log(err);
        }
        res.redirect('/task-list');
    });
});

router.route('/task-list/edit/:id')
    .get(function(req, res){
        tasks.view(req.params.id, function(err, result) {
            if (err) {
                console.log(err);
            }
            res.render("edit", {
                task: result[0]
            });
            console.log(result);
        });
    })
    .post(function(req, res){
        tasks.change(req.params.id, {
            task: req.body.task,
            details: req.body.details
        }, function (err) {
            if (err) {
                console.log(err);
            }
            res.redirect('/task-list');
        });
    });

router.route('/task-list/view/:id')
    .get(function(req, res){
        tasks.view(req.params.id, function(err, result) {
            if (err) {
                console.log(err);
            }
            res.render("view", {
                task: result[0]
            });
            console.log(result);
        });
    });
