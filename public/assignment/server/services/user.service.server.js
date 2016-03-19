/**
 * Created by rahul on 3/18/16.
 */
module.exports = function(app, usermodel) {
    console.log("In User Server Service");

    app.get("/api/assignment/user", findUser);
    app.get("/api/assignment/user/:id", findUserById);
    app.post("/api/assignment/user", createUser);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);


    function deleteUser(req, res) {
        res.json(usermodel.deleteUserByIdModel(req.params.id));
    }

    function updateUser(req, res) {
        console.log("In updateUser in Server User Service");
        console.log(req.body);
        res.json(usermodel.updateUser(req.params.id, req.body));
    }

    function createUser(req, res) {
        res.json(usermodel.createUser(req.body));
    }

    function findUser(req, res) {
        var uname = req.query.username;
        var pwd = req.query.password;

        if(!uname && !pwd) {
            var result = usermodel.findAll();   //model function
            res.json(result);
        } else if (uname && !pwd) {
            res.json(usermodel.findUserByUserName(uname));
        } else {
            var credentials = {username : uname, password : pwd };
            res.json(usermodel.findUserByCredentials(credentials));
        }
    }

    function findUserById(req, res) {
        var id = req.params.id;
        var result = usermodel.findUserById(id);
        res.json(result);
    }
};