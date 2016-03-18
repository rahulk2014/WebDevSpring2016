/**
 * Created by rahul on 3/18/16.
 */
module.exports = function(app, formModel) {
    app.get("/api/assignment/user/:userId/form", getFormsByUserIdService);
    app.get("/api/assignment/form/:formId", getFormByFormIdService);
    app.delete("/api/assignment/form/:formId", deleteFormByFormIdService);


    app.get("/api/assignment/user?username=username", getUserByUserNameService);
    app.get("/api/assignment/user?{username=alice&password=wonderland}", getUserByUserNameAndPasswordService);
    app.post("/api/assignment/user", createUserService);
    app.put("/api/assignment/user/:id", updateUserIdByIdService);


    function deleteFormByFormIdService(req, res) {
        var result = formModel.deleteFormByFormIdModel(req.params.formId);
        if(result) {
            res.json(result);
            return;
        }
        res.json({message : "Form Not Found"});
    }

    function getFormsByUserIdService(req, res) {
        var result = formModel.getFormsByUserIdModel(req.params.userId);
        if(result) {
            res.json(result);
            return;
        }
        res.json({message : "User Not Found"});
    }

    function getFormByFormIdService(req, res) {
        var result = formModel.getFormByFormIdModel(req.params.formId);
        if(result) {
            res.json(result);
            return;
        }
        res.json({message : "Form not found based on Form Id"});
    }


}