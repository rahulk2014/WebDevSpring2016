/**
 * Created by rahul on 3/30/16.
 */

"use strict";

module.exports = function(mongoose) {

    var field_schema = mongoose.Schema({

        label: String,
        type: {type: String, enum: ["TEXT", "TEXTAREA", "EMAIL", "PASSWORD", "OPTIONS", "DATE", "RADIOS", "CHECKBOXES"]},
        placeholder: String,
        options: [{label:String, value:String}]
    });
    return field_schema;
};
