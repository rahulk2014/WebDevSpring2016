/**
 * Created by rahul on 3/18/16.
 */
"use strict";

module.exports = function(app, UserModel){

    // Implementing PassportJS in user service.

    app.post("/api/assignment/user/login", login);
    app.get("/api/assignment/user/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findUser);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    function createUser(req, res){
        var user = req.body;
        UserModel.create(user).then(
            function(response){
                console.log("created User");
                req.session.loggedUser = response;
                console.log(req.session.loggedUser);
                res.json(response);
            },
            function (err){
                res.status(400).send(err);
            }
        );
    }

    function findUser(req, res){
        var username = req.query.username;
        var password = req.query.password;
        if(username && password){
            UserModel.findUserByCredentials(req.query).then(
                function(response){
                    res.json(response);
                });
        }
    }

    function findUserById(req,res){
        UserModel.findById(req.params.id).then(
            function(response){
                res.json(response);
            });
    }

    function updateUser(req,res){
        UserModel.update(req.params.id, req.body).then(
            function(response){
                res.json(response);
            });
    }

    function deleteUser(req, res){
        UserModel.remove(req.params.id).then(
            function(response){
                res.json(response);
            });
    }

    function login(req, res){
        UserModel.findUserByCredentials(req.body).then(
            function(response){
                req.session.loggedUser = response;
                res.json(response);
            });
    }

    function loggedin(req, res) {
        console.log("logged in called");
        console.log(req.session.loggedUser);
        res.json(req.session.loggedUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }
};