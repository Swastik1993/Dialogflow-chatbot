var server_port = process.env.PORT || 8080;

const express = require('express');
var mysql = require('mysql');
const app = express();

console.log("Connection started");

var connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-03.cleardb.net',
    user: 'be7e9cf753cb1f',
    password: 'a0702c79',
    database: 'heroku_436c978e02db98a'
});

app.get('/', function(request, response) {
    response.send('Hello World!!!! HOLA MUNDOOOOO!!!');
    /*
    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
        if (err) throw err;
  
        response.send('The solution is: ', rows[0].solution);
    });
    */
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    var sql = "show tables";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Tables... ", result);
    });

    /*
    var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
    */

    var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });

    var sql = "show tables";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Tables... ", result);
    });

    var sql = "SELECT * FROM customers";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Tables... ", result);
    });
});

//connection.end();

app.listen(server_port, function() {
    console.log("Application running on http://localhost:"+server_port);
});

