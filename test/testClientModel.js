import should from 'should';
import clientModel from '../src/models/ClientModel';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

describe('clientModelTests', () => {
    let client = {};
    //create a post with random user id before each test
    beforeEach(() => {
        client = {
            id: 999,
            name: 'A title',
            email: 'test',
            phone: 1
        };
    });

    it('should validate a client has all of the required data', done => {
        const m = new clientModel(client);
        m.validate(err => {
            should.not.exist(err);
            m.id.should.equal(client.id);
            m.name.should.equal(client.name);
            m.email.should.equal(client.email);
            m.phone.should.equal(client.phone);
            m.phone.should.be.type('number');

            done();
        });
    });
});
