/**
 * Created by rahul on 3/18/16.
 */
module.exports = function(app, formModel) {
    app.get("/api/assignment/user/:userId/form", getFormsByUserIdService);
    app.get("/api/assignment/form/:formId", getFormByFormIdService);
    app.delete("/api/assignment/form/:formId", deleteFormByFormIdService);
    app.post("/api/assignment/user/:userId/form", createFormService);
    app.put("/api/assignment/form/:formId", updateFormByFormIdService);

    function updateFormByFormIdService(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        var result = formModel.updateFormByFormIdModel(formId, form);
        if(result) {
            res.json(result);
            return;
        }
        return null;
    }

    function createFormService(req, res) {
        var userId = req.params.userId;
        var newForm = req.body;
        var result = formModel.createFormModel(userId, newForm);
        res.json(result);
    }

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