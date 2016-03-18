/**
 * Created by rahul on 3/18/16.
 */
module.exports = function(app, usermodel) {

    app.get("/api/assignment/user", getAllUsersService);
    app.get("/api/assignment/user/:id", getUserByIdService);
    app.get("/api/assignment/user?username=username", getUserByUserNameService);
    app.get("/api/assignment/user?{username=alice&password=wonderland}", getUserByUserNameAndPasswordService);
    app.post("/api/assignment/user", createUserService);
    app.put("/api/assignment/user/:id", updateUserIdByIdService);
    app.delete("/api/assignment/user/:id", deleteUserByIdService);


    //var userService = {
    //    getAllUsersService : getAllUsersService,
    //    getUserByIdService : getUserByIdService,
    //    getUserByUserNameService : getUserByUserNameService,
    //    getUserByUserNameAndPasswordService : getUserByUserNameAndPasswordService,
    //    createUserService : createUserService,
    //    updateUserIdByIdService : updateUserIdByIdService,
    //    deleteUserByIdService : deleteUserByIdService,
    //}

    //return userService;

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

    function getUserByUserNameAndPasswordService(req, res) {
        var uname = req.query.username;
        var pwd = req.query.password;
        var credentials = {username : uname, password : pws };
        var result = usermodel.getUserByUserNameAndPasswordModel(credentials);
        if(result) {
            res.json(result);
            return;
        }
        res.json({message : "User not found with the given username and password"});
    }

    function getUserByUserNameService(req, res) {
        var result = usermodel.getUserByUserNameModel(req.params.username);
        if(result) {
            res.json(result);
            return;
        }
        res.json({message : "User not found with the given credentials"});
    }

    function getAllUsersService(req, res) {
        console.log("Server getAllUsersService()");
        var result = usermodel.getAllUsersModel();   //model function
        res.json(result);
    }

    function getUserByIdService(req, res) {
        var id = req.params.id;
        var result = usermodel.getUserByIdModel(id);
        if(result) {
            res.json(result);
            return;
        }
        res.json({message : "User Not Found"});
    }
};