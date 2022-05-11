// const dbConnecion = require("./config/db.config.js");
const express = require("express");
const bodyParser = require("body-parser");
let randomstring = require("randomstring");
let mysql = require("mysql");
// const cors = require('cors')
const app = express();

app.use(bodyParser.json());
// app.use(cors);

let response = {
  resposeCode: 404,
  message: "",
};

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Admin@123",
  database: "serai_hrms",
});

app.get("/", (req, res) => {
  res.send("Serai Shipping HRMS-API");
});

// Get all employee deails
app.get("/employee", (req, res) => {
  let sqlQuery = "SELECT * FROM serai_hrms.employee";
  let query = connection.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Create a new employee
app.post("/create-employee", (req, res) => {
  let id = randomstring.generate(7);
  let data = {
    id: id,
    name: req.body.name,
    contact: req.body.contact,
    email: req.body.email,
    visaExpire: req.body.visaExpire,
  };
  let sqlQuery = "INSERT INTO employee SET ?";
  let query = connection.query(sqlQuery, data, (err, results) => {
    if (err) throw err;
    response.resposeCode = 200;
    response.message = "Employee created successfully!";
    res.send(response);
  });
});

// Get employee by id
app.get("/employee/:id", (req, res) => {
  let sqlQuery = `SELECT * FROM serai_hrms.employee where id='${req.params.id}'`;
  let query = connection.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Update employee details
app.put("/employee/:id", (req, res) => { 
  let sqlQuery = `UPDATE serai_hrms.employee set name='${req.body.name}',contact='${req.body.contact}',email='${req.body.email}',visaExpire='${req.body.visaExpire}' where id='${req.params.id}'`;
  let query = connection.query(sqlQuery, (err, resuls) => {
    if (err) throw err;
    response.resposeCode = 200;
    response.message = "Employee detail updated successfully";
    res.send(response);
  });
});

app.listen(3050, () => {
  console.log("Server is listening to port : 3050");
});
