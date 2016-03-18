/**
 * Created by rahul on 3/18/16.
 */
module.exports = function(app, usermodel) {
    console.log("In User Server Service");

    app.get("/api/assignment/user", findUser);
    app.get("/api/assignment/user/:id", findUserById);
    app.post("/api/assignment/user", createUserService);
    app.put("/api/assignment/user/:id", updateUserIdByIdService);
    app.delete("/api/assignment/user/:id", deleteUserByIdService);


    function deleteUserByIdService(req, res) {
        var result = deleteUserByIdModel(req.params.id);
        if(result) {
            res.json(result);
            return;
        }
        res.json({message : "User Not Found"});
    }

    function updateUserIdByIdService(req, res) {
        var result = updateUserIdByIdModel(req.params.id, req.body);
        if(result) {
            res.json(result);
            return;
        }
        res.json({message : "User not found "});
    }

    function createUserService(req, res) {
        var result = createUserModel(req.body);
        res.json(result);
    }

    function findUser(req, res) {
        console.log("Server getAllUsersService()");
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
        if(result) {
            res.json(result);
            return;
        }
        res.json({message : "User Not Found"});
    }
};