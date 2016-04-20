/**
 * Created by rahul on 3/18/16.
 */
module.exports = function(app, Usermodel) {
    console.log("In User Server Service");

    app.get("/api/assignment/user", findUser);
    app.get("/api/assignment/user/:id", findUserById);
    app.post("/api/assignment/user", createUser);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);


    function deleteUser(req, res) {
        UserModel.remove(req.params.id).then(
            function(response){
                res.json(response);
            });
    }

    function updateUser(req, res) {
        UserModel.update(req.params.id, req.body).then(
            function(response){
                res.json(response);
            });
    }

    function createUser(req, res) {
        var user = req.body;
        UserModel.create(user).then(
            function(response){
                res.json(response);
            });
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password){
            UserModel.findUserByCredentials(req.query).then(
                function(response){
                    res.json(response);
                });
        }
    }

    function findUserById(req, res) {
        UserModel.findById(req.params.id).then(
            function(response){
                res.json(response);
            });
    }
};