/**
 * Created by rahul on 3/17/16.
 */
module.exports = function(app) {

    var formData = require("./form.mock.json");
    var newFormId = require("node-uuid");

    var model = {
        createFormModel :createFormModel,
        updateFormByFormIdModel : updateFormByFormIdModel,
        getFormsByUserIdModel : getFormsByUserIdModel,
        getFormByFormIdModel : getFormByFormIdModel,
        deleteFormByFormIdModel : deleteFormByFormIdModel,
        getFieldsForForm : getFieldsForForm,
        getFieldIdForForm : getFieldIdForForm,
        deleteFieldFromForm : deleteFieldFromForm,
        createFieldForForm : createFieldForForm,
        updateField : updateField
    }

    return model;

    function createFormModel(userId, form) {
        var newForm = {
            "_id" : newFormId.v1(),
            "title" : form.title,
            "userId" : userId,
            "fields" : form.fields
        }
        formData.push(newForm);
        return formData;
    }

    function updateFormByFormIdModel(formId, form) {
        var formFound = getFormByFormIdModel(formId);
        if(formFound) {
            formFound.title = form.title;
            formFound.userId = form.userId;
            formFound.fields = form.fields;
            return formFound;
        }
        return null;
    }

    function getFormsByUserIdModel(userId) {
        var formList = [];
        for(i in formData) {
            if(formData[i].userId == userId) {
                formList.push(formData[i]);
            }
        }
        if(!formList.length)
            return null;
        return formList;
    }

    function getFormByFormIdModel(formId) {
        for(i in formData) {
            if(formData[i]._id == formId) {
                return formData[i];
            }
        }
        return null;
    }

    function getUserIdByFormId(formId) {
        for(i in formData) {
            if(formId == formData[i]._id) {
                return formData[i].userId;
            }
        }
        return null;
    }

    function deleteFormByFormIdModel(formId) {
        var formFound = getFormByFormIdModel(formId);
        var userId = getUserIdByFormId(formId);
        var formList = [];

        if(formFound) {
            formData.splice(formFound, 1);
            for(i in formData) {
                if(userId == formData[i].userId) {
                    formList.push(formData[i]);
                }
            }
            return formList;
        }
        return null;
    }

    // Form Field Functions

    /*
      Returns all the fields for a specific formId
     */
    function getFieldsForForm(formId) {
        for(i in formData) {
            if(formData[i].formId == formId) {
                return formData[i].fields;
            }
        }
        return null;
    }

    /*
       Returns a specific field from a form based on FieldId
     */
    function getFieldIdForForm(formId, fieldId) {

        for(i in formData) {
            if(formData[i].formId == formId){
                var fields = formData[i].fields;
                for(j in fields) {
                    if(fields[j].fieldId == fieldId) {
                        return fields[j];
                    }
                }
            }
        }
        return null;
    }

    /*
       Delete a specific field Object from the given Form based on formId and fieldId
     */
    function deleteFieldFromForm(formId, fieldId) {

        for(i in formData) {
            if(formData[i].formId == formId) {
                var fields = formData[i].fields;
                for(j in fields) {
                    if(fields[j].fieldId == fieldId) {
                        fields.splice(j, 1);
                        return fields;
                    }
                }
            }
        }
        return null;
    }

    /*
       Returns updated fields with newly added field object
     */
    function createFieldForForm(formId, field) {
        for(i in formData) {
            if(formData[i].formId == formId) {
                var newField = {
                    "_id": field._id,
                    "label": field.label,
                    "type": field.type,
                    "placeholder": field.placeholder
                }
                formData[i].fields.push(newField);
                return newField;
            }
        }
        return null;
    }

    /*
       Updates the specific field Object
     */
    function updateField(formId, fieldId, field) {
        for(i in formData) {
            if(formData[i].formId == formId) {
                var fields = formData[i].fields;
                for(j in fields) {
                    if(fields[j].fieldId == fieldId){
                        var fieldObj = fields[j];
                        fieldObj._id = field._id;
                        fieldObj.label = field.label;
                        fieldObj.type = field.type;
                        fieldObj.placeholder = field.placeholder;
                        return fieldObj
                    }

                }
            }
        }
        return null;
    }

}