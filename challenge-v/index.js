var express = require("express");
var app = express();
var router = express.Router();
app.use("/",router);

var urlString = "https://us-west-2.cloudconformity.com/v1/services";

fetch('urlString')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
  });
/*

router.get(‘/’,function(req, res){
  res.sendFile(path + ‘index.html’);
});
  
router.get(‘/product’,function(req, res){
  res.sendFile(path + ‘product.html’);});
  
router.get(‘/about’,function(req, res){
  res.sendFile(path + ‘about.html’);
});
  
app.use(‘*’,function(req, res){
  res.send(‘Error 404: Not Found!’);
});
  
app.listen(3000,function(){
  console.log(“Server running at Port 3000”);

});

*/