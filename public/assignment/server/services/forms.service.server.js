/**
 * Created by rahul on 3/18/16.
 */
module.exports = function(app, model) {

    app.get("/api/assignment/user/:userId/form", getFormByUserId);
    app.get("/api/assignment/form/:formId", getFormById);
    app.delete("/api/assignment/form/:formId", deleteForm);
    app.post("/api/assignment/user/:userId/form", create);
    app.put("/api/assignment/form/:formId", update);
    app.get("/api/assignment/form?formTitle=formTitle", getFormByTitle);

    function update(req, res){
        model.update(req.params.formId, req.body).then(
            function(response){
                res.json(response);
            });

    }

    function create(req, res){
        model.create(req.params.userId, req.body).then(
            function(response){
                res.json(response);
            });
    }
    function deleteForm(req, res){
        model.remove(req.params.formId).then(
            function(response){
                res.json(response);
            });
    }

    function getFormByUserId(req, res){
        model.findFormByUserId(req.params.userId).then(
            function(response){
                res.json(response);
            });
    }
    function getFormByTitle(req, res){

        var formTitle = req.param("formTitle");
        model.findFormByTitle(formTitle)
            .then(function(response){
                res.json(response);
            });
    }
}