const mysql = require('mysql');
const con = mysql.createConnection({
    host: "db4free.net",
    user: "ankit1",
    password: "Ankit750",
    database: "sqldata1",

});

con.connect((err) => {
    if (err) throw err;
    console.log("connected to db");
});

module.exports.con = con;