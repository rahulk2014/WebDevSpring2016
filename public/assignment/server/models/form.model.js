/**
 * Created by rahul on 3/17/16.
 */
module.exports = function(app) {

    var formData = require("./form.mock.json");

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