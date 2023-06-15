const express = require('express');
const mysql = require('mysql');

const app = express();

// Create connection
const conn = mysql.createConnection({
    host     : '156.67.64.9',
    user     : 'u323401078_nodejs',
    password : 'Demo-123',
    database : 'u323401078_nodejs'
  });

  // Connect db
  conn.connect((err) => 
  {
    if(err){
        throw err;
    }
    console.log('MySql connected');
  });

  // Inset data into table
  app.get('/addpost1', (req, res) => {
    let post = {title:'Post Two', body:'Post One descriprion2'};
    let sql = "Insert into posts SET ?";
    let query = conn.query(sql, post, (err, result) => {
        if(err){
            throw err;
        } 
        console.log(result);
        res.send('Post created');
    });
  });

  // get data from table
  app.get('/getposts', (req, res)=>{
    let sql = "select * from posts";
    let query = conn.query(sql, (err, results) =>{
        if(err) throw err;
        console.log(results);
        res.send('Posts fetched');
    });
  });

  // get single data from table
  app.get('/getpost/:id', (req, res)=>{
    let sql = `select * from posts where id = ${req.params.id}`;
    let query = conn.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send('Posts fetched');
    });
  });

  // Update posts
  app.get('/updatepost/:id', (req, res) => {
    let newTitle = 'Update Tile';
    let sql = `update posts set title = '${newTitle}' where id = ${req.params.id}`;
    let query = conn.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send('Posts updated');
    });
  });

  // Delete post
  app.get('/deletepost/:id', (req, res) => {
    let sql = `delete from posts where id = ${req.params.id}`;
    let query = conn.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send('Posts deleted');
    });
  });

app.listen('3000', () => {
    console.log('Server started on Port no 3000');
});