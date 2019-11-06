var db = require('./db');

//define a module in node.js by using export
exports.getAllAuthors = function(cb){ //callback function
  //Asynch operation is connecting to db
  //this i/o operation is going to resolve once that query is run
    db.query('select * from tbl_author', function(err, result) {
        cb(err, result);
      });
};

exports.addAuthor = function(author, cb){
  db.beginTransaction(function(err){ //start a transaction
      if(err) cb(err, null);
  
      db.query('insert into tbl_author(authorName) value(?)', [author.authorName], function(err, res){
        if(err){
          db.rollback(function(err, res){
            cb(err, res);
          });
        } 
        db.commit(function(err, res){
          cb(err, res);
        });
      });
    });
};

exports.updateAuthor = function(author, cb){
  db.beginTransaction(function(err){ //start a transaction
      if(err) cb(err, null);
  
      db.query('update tbl_author set authorName = ? where authorId = ?', [author.authorName, author.authorId], function(err, res){
        if(err){
          db.rollback(function(err, res){
            cb(err, res);
          });
        } 
        db.commit(function(err, res){
          cb(err, res);
        });
      });
    });
};

exports.removeAuthor = function(authorId, cb){
  db.beginTransaction(function(err){
      if(err) cb(err, null);
  
      db.query('delete from tbl_author where authorId = ?', [authorId], function(err, res){
        if(err){
          db.rollback(function(err, res){
            cb(err, res);
          });
        } 
        db.commit(function(err, res){
          cb(err, res);
        });
      });
    });
}