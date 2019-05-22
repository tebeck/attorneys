// Removes all products

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27077/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("cafe");
  dbo.collection("Products").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    db.close();
  });
});
