var mysql = require('mysql');
 
var connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-03.cleardb.net',
    user: 'be7e9cf753cb1f',
    password: 'a0702c79',
    database: 'heroku_436c978e02db98a'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });

    var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
});

connection.end();
