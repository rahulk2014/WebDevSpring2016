/**
 * Created by rahul on 4/24/16.
 */
var request = require(request);
var url = "";
var apiKey = "";

module.exports = function(app) {
    app.get("/api/project/search/:query", findDataByQuery);

    function findDataByQuery(req, res) {
        var query = req.params.query;
    }
}
