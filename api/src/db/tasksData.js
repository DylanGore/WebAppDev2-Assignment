import taskModel from '../models/TaskModel';

const tasks = [
    {
        project: 1,
        description: 'Example Task 1',
        due: '2019-12-01T23:59:00.000Z',
        state: 'in_progress',
        id: 1
    },
    {
        project: 3,
        description: 'Example Task 2',
        due: '2019-12-01T23:59:00.000Z',
        state: 'overdue',
        id: 2
    },
    {
        project: 1,
        description: 'Example Task 3',
        due: '2019-12-01T23:59:00.000Z',
        state: 'future',
        id: 3
    },
    {
        project: 3,
        description: 'Example Task 4',
        due: '2019-12-01T23:59:00.000Z',
        state: 'complete',
        id: 4
    },
    {
        project: 1,
        description: 'Example Task 5',
        due: '2019-12-01T23:59:00.000Z',
        state: 'in_progress',
        id: 5
    },
    {
        project: 1,
        description: 'Example Task 6',
        due: '2019-12-01T23:59:00.000Z',
        state: 'in_progress',
        id: 6
    }
];

export default async function loadTasks() {
    try {
        await taskModel.deleteMany();
        await taskModel.collection.insertMany(tasks);
        console.info(`DB: ${tasks.length} tasks added to collection.`);
    } catch (err) {
        console.error(`DB: Failed to add data to tasks collection - ${err}`);
    }
}
