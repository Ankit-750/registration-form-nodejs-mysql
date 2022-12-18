const express = require('express');
const app = express();
const mysql = require("./connection").con;
const port = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.set("views", "./view");


app.get("/", (req, res) => {
   res.render("index")
});

app.get("/add", (req, res) => {
   res.render("add")
});

app.get("/search", (req, res) => {
   res.render("search")
});

app.get("/update", (req, res) => {
   res.render("update")
});

app.get("/delete", (req, res) => {
   res.render("delete")
});

app.get("/view", (req, res) => {
   let qry = "select * from student";

   mysql.query(qry, (err, result) => {
      if (err) throw err
      else {
         res.render("view", { data: result })
      }
   })
})

app.get("/addstudent", (req, res) => {
   const { name, phone, email, gender, bio } = req.query

   let qry = "select * from student where emailid=? or phoneno=?";

   mysql.query(qry, [email, phone], (err, result) => {
      if (err)
         throw err
      else {
         if (result.length > 0) {
            res.render("add", { chkmess: true })
         } else {
            let qry2 = "insert into student values(?,?,?,?,?)";
            mysql.query(qry2, [name, phone, email, gender, bio], (err, result) => {
               if (result.affectedRows > 0) {
                  res.render("add", { mess: true })
               }
            })
         }
      }
   })
});

app.get("/searchstudent", (req, res) => {
   const { phone } = req.query;
   let qry = "select * from student where phoneno=?";
   mysql.query(qry, [phone], (err, result) => {
      if (err) throw err
      else {
         if (result.length > 0) {
            res.render("search", { mess1: true, mess2: false })
         } else {
            res.render("search", { mess1: false, mess2: true })
         }
      }
   })
})

app.get("/updatestudent", (req, res) => {
   const { phone } = req.query;
   let qry = "select * from student where phoneno=?";
   mysql.query(qry, [phone], (err, result) => {
      if (err) throw err
      else {
         if (result.length > 0) {
            res.render("update", { mess1: true, mess2: false, data: result })
         } else {
            res.render("update", { mess1: false, mess2: true })
         }
      }
   })
})

app.get("/updatestu", (req, res) => {
   const { name, gender, phone } = req.query;
   let qry = "update student set username=?, gender=? where phoneno=?";
   mysql.query(qry, [name, gender, phone], (err, result) => {
      if (err) throw err
      else {
         if (result.affectedRows > 0) {
            res.render("update", { umesg: true })
         } else {

         }
      }
   })
})

app.get("/removestudent", (req, res) => {
   const { phone } = req.query;
   let qry = "delete from student where phoneno=?";
   mysql.query(qry, [phone], (err, result) => {
      if (err) throw err
      else {
         if (result.affectedRows > 0) {
            res.render("delete", { mess1: true, mess2: false })
         } else {
            res.render("delete", { mess1: false, mess2: true })
         }
      }
   })
})

app.listen(port, console.log("your server sucessfully created"));