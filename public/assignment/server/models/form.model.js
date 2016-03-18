/**
 * Created by rahul on 3/17/16.
 */
module.exports = function(app) {

    var formData = require("./form.mock.json");
    var newFormId = require("node-uuid");

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
            return formData;
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

    function deleteFormByFormIdModel(formId) {
        var formFound = getFormByFormIdModel(formId);
        if(formFound) {
            formData.splice(formFound, 1);
            return formData;
        }
        return null;
    }


}