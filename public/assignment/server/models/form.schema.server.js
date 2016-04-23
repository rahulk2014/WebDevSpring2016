/**
 * Created by rahul on 3/30/16.
 */

module.exports = function(mongoose){

    var FieldSchema = require('./field.schema.server.js')(mongoose);

    var FormSchema = mongoose.Schema({

        "userId": String,
        "title": String,
        "field": [FieldSchema],
        "created": Date,
        "udpated": Date
    },{collection: 'assignment.form'});

    return FormSchema;
};
