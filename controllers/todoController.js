var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to databases
mongoose.connect('mongodb://test:test@ds213259.mlab.com:13259/todo');

// var data = [{item: 'study'}, {item: 'clean the house'}, {item: 'go out with my boyfriend'}];

// Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);


var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app) {

app.get('/todo', function(req, res){
  // get data from mongodb and pass it to view
  Todo.find({}, function(err, data){
      if (err) throw err;
      res.render('todo', {todos: data});
  });

});

app.post('/todo', urlencodedParser, function(req, res){
   // get data from the view and add it to mongodb 
   var newTodo = Todo(req.body).save(function(err, data){
       if (err) throw err;
       res.json(data);
   })
});

app.delete('/todo/:item', function(req, res){
    // delete the requested item from monogodb
    Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err, data){
        if (err) throw err;
        res.json(data);
    });
});

}