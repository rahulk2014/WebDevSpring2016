/**
 * Created by rahul on 3/19/16.
 */
module.exports = function(app, formModel) {

    app.get("/api/assignment/form/:formId/field", getFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldByFormIdAndFieldId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFormIdAndFieldId);
    app.post("/api/assignment/form/:formId/field", createFieldByFormId);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFormIdAndFieldId);

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