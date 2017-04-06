var Todo = require('./models/todo');
var Parking = require('./models/parking');

function getTodos(res) {
    Parking.find(function(err, parking) {
  if (err)
    res.send(err);
  res.json(parking);
  });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/parking', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });

    app.get('/api/parking/:parking_id', function (req, res) {
        // use mongoose to get all todos in the database
       Parking.findById(req.params.parking_id, function(err, parking) {
  if (err)
    res.send(err);
  res.json(parking);
  });
    });

    // create todo and send back all todos after creation
    app.post('/api/parking', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
       var parking = new Parking(req.body);     
  parking.save(function(err) {
    if (err)
      res.send(err);
        res.json({ message: 'Data logged!' });
  });    

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });
    app.put('/api/parking/:parking_id', function (req, res) {
        console.log(req.params.parking_id);
  Parking.findById(req.params.parking_id, function(err, parking) {
    console.log(parking, 'parking data')
      if (err) { // add empty check after installing lodash _.isEmpty(parking) 
        res.send(err);
      }
      if (!parking || parking === null) {
        var customError = { 'msg': 'Parking not found' };
        res.send(customError);
      }
      if( req.body.space )
      {parking.space = req.body.space;}
    if( req.body.isEmpty )
      parking.isEmpty = req.body.isEmpty;
  if( req.body.isReserved )
    parking.isReserved = req.body.isReserved;  
      parking.save(function(err) {
        if (err) {
          res.send(err);
        } else {
                res.json({ message: 'Parking updated!' });
            }
      });
  });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
