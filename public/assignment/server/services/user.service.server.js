/**
 * Created by rahul on 3/18/16.
 */
module.exports = function(app, usermodel) {

    app.get("/api/assignment/user", getAllUsersService);
    app.get("/api/assignment/user/:id", getUserByIdService);
    app.get("/api/assignment/user?username=username", getUserByUserNameService);
    app.get("/api/assignment/user?username=alice&password=wonderland", getUserByUserNameAndPasswordService);
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

    function getAllUsersService(req, res) {
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