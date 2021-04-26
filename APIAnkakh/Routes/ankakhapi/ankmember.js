const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// MySQL Create Connection
/*
If the following code throws the error "ER_NOT_SUPPORTED_AUTH_MODE" run this query in mysql workbench:

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '0000';

flush privileges;

*/
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "0000",
    database: "ankakh"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


// Add User
router.post('/addUser', (request, response) => 
{

    connection.query(`Insert into user(name, gameCompleted) values('${request.body.name}', false);`, function(err, result) {
        if (err) throw err;
        response.render("ankuser", {userName: request.body.Name, usergameCompleted : false});
    });

});

// Change gameCompleted variable in database
router.post('/gameComplete', (request, response) => 
{
    
    connection.query(`Update user set gameCompleted=${true} where name='${request.body.name}';`, function(err, result) {
        if (err) throw err;
        response.sendStatus("200");
    });
});

// Get all users
router.get('/users', (request, response) => 
{
    connection.query(`select * from user;`, function(err, result) {
        if (err) throw err;
        response.render("ankallUsers", { users: result });
    });
    
});

module.exports = router;