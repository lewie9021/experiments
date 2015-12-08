var Express = require("express");

var app = Express();

app.use(Express.static("public"));
app.listen(3000);
