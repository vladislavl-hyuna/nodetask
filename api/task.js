var express = require("express");

var tasks = require("./../models/task.js");

var router = express.Router();
module.exports = router;

router.route('/api/task-list')
    .get(function(req, res){
        tasks.list(function(err,result) {
            res.status(200).json(result);
            console.log(result);
        });
    })
    .post(function(req,res) {
        tasks.add({
            task: req.body.task,
            details: req.body.details
        }, function(err,result) {
            if (err) {
                console.log(err);
            }
            console.log(result);
            res.status(200).json(result.insertId);
        });
    });

router.route('/api/task-list/task/:id')
    .get(function(req, res){
        tasks.view(req.params.id, function(err, result) {
            if (err) {
                console.log(err);
            }
            res.status(200).json(result[0]);
            console.log(result[0]);
        });
    })
    .put(function(req, res){
        tasks.change(req.params.id, {
            task: req.body.task,
            details: req.body.details
        }, function (err,result) {
            if (err) {
                console.log(err);
            }
            res.status(200).json(result);
        });
    })
    .delete(function(req, res){
        tasks.delete(req.params.id, function(err) {
            if (err) {
                console.log(err);
                throw err;
            }
            var result = {
                id: req.params.id,
                message: "Task deleted"
            };
            res.status(200).json(result);
        });
    });
