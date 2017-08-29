var express = require('express');
var app = express();

// app.get('/', function (req, res) {
//   res.send('Hello World!')
// });

app.use(express.static(__dirname + '/build'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Example app listening on port 3000!')
});

// const PORT = process.env.PORT || 3000;
// module.exports = exports = (port, cb) => {
//   return app.listen(port || PORT,
//     cb || (() => console.log('Server running on Port: ' + PORT)));
// };