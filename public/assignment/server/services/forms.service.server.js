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
        res.json(result);
    }

    function createFormService(req, res) {
        var userId = req.params.userId;
        var newForm = req.body;
        var result = formModel.createFormModel(userId, newForm);
        res.json(result);
    }

    function deleteFormByFormIdService(req, res) {
        var result = formModel.deleteFormByFormIdModel(req.params.formId);
        res.json(result);
    }

    function getFormsByUserIdService(req, res) {
        var result = formModel.getFormsByUserIdModel(req.params.userId);
        console.log("HI : " + result.length);
        res.json(result);
    }

    function getFormByFormIdService(req, res) {
        var result = formModel.getFormByFormIdModel(req.params.formId);
        res.json(result);
    }


}