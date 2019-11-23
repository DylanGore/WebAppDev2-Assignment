import fs from 'fs';
import projectModel from '../models/ProjectModel';
import taskModel from '../models/TaskModel';
import clientModel from '../models/ClientModel';

async function seedAll() {
    // Load data from JSON file that was used by json-server
    let dbJson = JSON.parse(fs.readFileSync('../db.json'));

    await loadCollection(dbJson.projects, projectModel, 'projects');
    await loadCollection(dbJson.tasks, taskModel, 'tasks');
    await loadCollection(dbJson.clients, clientModel, 'clients');
}

async function loadCollection(data, model, name) {
    try {
        await model.deleteMany();
        await model.collection.insertMany(data);
        console.info(`DB: ${data.length} ${name} added to collection.`);
    } catch (err) {
        console.error(`DB: Failed to add data to ${name} collection - ${err}`);
    }
}

export { seedAll };
