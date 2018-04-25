var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to databases
mongoose.connect('mongodb://test:test@ds213259.mlab.com:13259/todo');

var data = [{item: 'study'}, {item: 'clean the house'}, {item: 'go out with my boyfriend'}];

// Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);
var itemOne = Todo({item: 'buy flowers'}).save(function(err){
    if (err) throw err;
    console.log('item saved');
});

var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app) {

app.get('/todo', function(req, res){
  res.render('todo', {todos: data});
});

app.post('/todo', urlencodedParser, function(req, res){
   data.push(req.body);
   res.json(data);
});

app.delete('/todo/:item', function(req, res){
    data = data.filter(function(todo){
        return todo.item.replace(/ /g,'-') !== req.params.item;
    });
    res.json(data);

});

}