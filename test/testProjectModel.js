import should from 'should';
import projectModel from '../src/models/ProjectModel';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

describe('projectModelTests', () => {
    let project = {};
    let currDate = Date.now();
    //create a post with random user id before each test
    beforeEach(() => {
        project = {
            id: 999,
            title: 'A title',
            type: 'test',
            client: 1,
            description: 'This is a test',
            due: currDate
        };
    });

    it('should validate a project has all of the required data', done => {
        const m = new projectModel(project);
        m.validate(err => {
            should.not.exist(err);
            m.title.should.equal(project.title);
            m.type.should.equal(project.type);
            m.client.should.equal(1);
            m.description.should.equal(project.description);
            should.exist(m.due);
            m.due.should.be.type('object');

            done();
        });
    });
});
