//call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var Storage = function() {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) {
    var item = {name: name, id: this.id};
    this.items.push(item);
    this.id += 1;
    return item;
};

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

//define the app using express
var app = express();
app.use(express.static('public'));

//get route
app.get('/items', function(request, response) {
    response.json(storage.items);
});

//post route
app.post('/items', jsonParser, function(request, response) {
    if(!request.body) {
        return response.sendStatus(400);
    }
    
    var item = storage.add(request.body.name);
    response.status(201).json(item);
});

console.log(storage.items)

//delete route
app.delete('/items/:id', function(request, response) {
    if(!request.params.id) {
        return response.sendStatus(400);
    }
    
    var removed = null;
    
    for (var i = 0; i < storage.items.length; i++) {
        var item = storage.items[i];
        if (item.id == request.params.id) {
            removed = storage.items.splice(i,1);
        }
    }
    
    if (removed) {
        return response.status(200).json(removed);
    }

});

//put route
app.put('/items/:id', function(request, response) {
    if(!request.params.id  && !request.body.id) {
        return response.sendStatus(400);
    }
    
    var updated = storage.items.name && storage.item.id;
    response.status(200).json(updated);
});

app.listen(process.env.PORT, process.env.IP);

//exports
exports.app = app;
exports.storage = storage;