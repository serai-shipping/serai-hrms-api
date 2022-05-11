let mysql = require('mysql');

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Admin@123",
    database: "serai_HRMS"
})

connection.connect((err) => {
    if(err){
        return console.log('Error: ',err.message);
    }
    console.log("Connected to mysql server :)");
})