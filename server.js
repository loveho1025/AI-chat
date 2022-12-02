var express = require("express");
var app = express();
const router = express.Router();

var client_id = "wRc1dRVvzvYvlkdK4qfT";
var client_secret = "9KzEgjuL7H";
var query;
app.get("/translate", function (req, res) {
    query = req.query.msg;
    var api_url = "https://openapi.naver.com/v1/papago/n2mt";
    var request = require("request");
    var options = {
        url: api_url,
        form: { source: "ko", target: "en", text: query },
        headers: {
            "X-Naver-Client-Id": client_id,
            "X-Naver-Client-Secret": client_secret,
        },
    };
    request.post(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
            res.end(body);
        } else {
            res.status(response.statusCode).end();
            console.log("error = " + response.statusCode);
        }
    });
});
app.listen(8081, function () {
    console.log("8081/translate app listening on port 3000!");
});
