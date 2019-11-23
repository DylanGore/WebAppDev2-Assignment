import projectModel from '../models/ProjectModel';

const projects = [
    {
        title: 'Project 1',
        type: 'Website',
        client: 1,
        description: 'Project description',
        due: '2019-11-01T23:59:00.000Z',
        id: 1
    },
    {
        title: 'Project 2',
        type: 'Personal Project',
        client: 1,
        description: 'Project description',
        due: '2019-11-01T23:59:00.000Z',
        id: 2
    },
    {
        title: 'Project 3',
        type: 'Website',
        client: 2,
        description: 'Project description',
        due: '2019-11-01T23:35:00.000Z',
        id: 3
    },
    {
        title: 'Project 4',
        type: 'College Assignment',
        client: 4,
        description: 'Example',
        due: '2019-12-02T23:59:00.000Z',
        id: 4
    },
    {
        title: 'Project 5',
        type: 'College Assignment',
        client: '3',
        description: 'Example Edit',
        due: '2019-11-01T23:09:00.000Z',
        id: 5
    },
    {
        title: 'Project 6',
        type: 'Personal Project',
        client: '4',
        description: 'Example',
        due: '2019-11-01T13:00:00.000Z',
        id: 6
    },
    {
        title: 'Exampke',
        type: 'Personal Project',
        client: '3',
        description: 'eetw',
        due: '2019-10-30T00:00:00.000Z',
        id: 7
    }
];

export default async function loadProjects() {
    try {
        await projectModel.deleteMany();
        await projectModel.collection.insertMany(projects);
        console.info(`DB: ${projects.length} projects added to collection.`);
    } catch (err) {
        console.error(`DB: Failed to add data to projects collection - ${err}`);
    }
}
