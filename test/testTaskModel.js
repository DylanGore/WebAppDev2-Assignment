import should from 'should';
import taskModel from '../src/models/TaskModel';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

describe('taskModelTests', () => {
    let task = {};
    //create a post with random user id before each test
    beforeEach(() => {
        task = {
            id: 999,
            project: 1,
            description: 'Test Task',
            due: Date.now(),
            state: 'in_progress'
        };
    });

    it('should validate a task has all of the required data', done => {
        const m = new taskModel(task);
        m.validate(err => {
            should.not.exist(err);
            m.id.should.equal(task.id);
            m.id.should.be.type('number');
            m.description.should.equal(task.description);
            should.exist(m.due);
            should.exist(m.state);

            done();
        });
    });
});
