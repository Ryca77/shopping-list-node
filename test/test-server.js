describe('Shopping List', function() {
    it('should list items on get');
    it('should add an item on post');
    it('should edit an item on put');
    it('should delete an item on delete');
    it('should not post to an id that exists');
    it('should not post without body data');
    it('should not post with something other than valid json');
    it('should not put without an id in the endpoint');
    it('should not put with different id in the endpoint than the body');
    it('should not put to an id that doesnt exist');
    it('should not put without body data');
    it('should not put with something other than valid json');
    it('should not delete an id that doesnt exist');
    it('should not delete without an id at the endpoint');
});

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);

describe('Shopping List', function() {
    it('should list items on get', function(done) {
        chai.request(app)
            .get('/items')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('id');
                res.body[0].should.have.property('name');
                res.body[0].id.should.be.a('number');
                res.body[0].name.should.be.a('string');
                res.body[0].name.should.equal('Broad beans');
                res.body[1].name.should.equal('Tomatoes');
                res.body[2].name.should.equal('Peppers');
                done();
            });
    });
    it('should add an item on post', function(done) {
        chai.request(app)
            .post('/items')
            .send({'name': 'Kale'})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('id');
                res.body.name.should.be.a('string');
                res.body.id.should.be.a('number');
                res.body.name.should.equal('Kale');
                storage.items.should.be.a('array');
                storage.items.should.have.length(4);
                storage.items[3].should.be.a('object');
                storage.items[3].should.have.property('id');
                storage.items[3].should.have.property('name');
                storage.items[3].id.should.be.a('number');
                storage.items[3].name.should.be.a('string');
                storage.items[3].name.should.equal('Kale');
                done();
            });
    });
    it('should edit an item on put', function(done) {
        chai.request(app)
            .put('/items/0')
            .send({'name': 'Apples'})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.a.property('name');
                res.body.should.have.a.property('id');
                res.body.name.should.be.a('string');
                res.body.id.should.be.a('number');
                res.body.name.should.equal('Apples');
                res.body.id.should.equal(0);
                storage.items[0].should.be.a('object');
                storage.items[0].should.have.a.property('name');
                storage.items[0].should.have.a.property('id');
                storage.items[0].name.should.be.a('string');
                storage.items[0].id.should.be.a('number');
                storage.items[0].name.should.equal('Apples');
                storage.items[0].id.should.equal(0)
                done();
            });
    });
    it('should delete an item on delete', function(done) {
        chai.request(app)
            .delete('/items/0')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                storage.items.should.have.length(3);
                storage.items[0].should.be.a('object');
                storage.items[0].should.have.a.property('name');
                storage.items[0].should.have.a.property('id');
                storage.items[0].name.should.be.a('string');
                storage.items[0].id.should.be.a('number');
                storage.items[0].name.should.equal('Tomatoes');
                storage.items[1].name.should.equal('Peppers');
                storage.items[2].name.should.equal('Kale');
                done();
            });
    });
    it('Should not post to an id that exists', function(done) {
        chai.request(app)
            .post('/items')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.body.id.should.not.equal(3);
                res.body.id.should.not.equal(5);
                res.body.id.should.equal(4);
                done();
            });
    });
    
    it('Should not post without body data', function(done) {
        chai.request(app)
            .post('/items')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.have.body;
                done()
            });
    });
});
