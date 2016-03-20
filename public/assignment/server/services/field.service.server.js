/**
 * Created by rahul on 3/19/16.
 */
module.exports = function(app, formModel) {

    app.get("/api/assignment/form/:formId/field", getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldIdForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);

    function getFieldsForForm(req, res) {
        res.json(formModel.getFieldsForForm(req.params.formId));
    }

    function getFieldIdForForm(req, res) {
        res.json(formModel.getFieldIdForForm(req.params.formId, req.params.fieldId));
    }

    function deleteFieldFromForm(req, res) {
        res.json(formModel.deleteFieldFromForm(req.params.formId, req.params.fieldId));
    }

    function createFieldForForm(req, res) {
        res.json(formModel.createFieldForForm(req.params.formId, req.body));
    }

    function updateField(req, res) {
        res.json(formModel.updateField(req.params.formId, req.params.fieldId, req.body));
    }
}