var data = [{item: 'study'}, {item: 'clean the house'}, {item: 'go out with my boyfriend'}];

module.exports = function(app) {

app.get('/todo', function(req, res){
  res.render('todo', {todos: data});
});

app.post('/todo', function(req, res){

});

app.delete('/todo', function(req, res){

});

}