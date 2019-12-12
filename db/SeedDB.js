import fs from 'fs';
import projectModel from '../models/ProjectModel';
import taskModel from '../models/TaskModel';
import clientModel from '../models/ClientModel';
import path from 'path';

async function seedAll() {
    // Load data from JSON file that was used by json-server
    let dbJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json')));

    // Save data to each collection
    await loadCollection(dbJson.projects, projectModel, 'projects');
    await loadCollection(dbJson.tasks, taskModel, 'tasks');
    await loadCollection(dbJson.clients, clientModel, 'clients');
}

async function loadCollection(data, model, name) {
    try {
        await model.deleteMany(); // clear existing data
        await model.collection.insertMany(data); // add new data from file
        console.info(`DB: ${data.length} ${name} added to collection.`);
    } catch (err) {
        console.error(`DB: Failed to add data to ${name} collection - ${err}`);
    }
}

export default seedAll;
