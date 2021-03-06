var fs = require('fs');
var http = require('express');
var sys = require('sys')
var exec = require('child_process').exec;

var express = require("express");
var app = express();

app.get('/', function(req, res){
  var file = req.query.file
  var line = req.query.line
  if(line==undefined){
    line = "0"
  }
  if(file!=undefined){
    console.log('Opening '+file+" "+line)
    exec("/usr/local/bin/subl "+file+":"+line, function (error, stdout, stderr) {
      res.send('errors: ' + stderr + " out: "+stdout);  
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
  }else{
    res.send('file param not set');  
  }
});

app.get('/quit', function(req,res) {
  res.send('closing..');
  server.close();
  process.exit();
});

var server = app.listen(8765);

console.log('Listening at: http://localhost:8765');
