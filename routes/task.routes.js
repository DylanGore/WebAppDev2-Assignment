import express from 'express';
import asyncHandler from 'express-async-handler';
import Task from '../models/TaskModel';

const router = express.Router();

// GET - /api/tasks (all tasks)
router.get('/', async (req, res) => {
    try {
        let limit = 0;
        let project = {};
        if (req.query.limit !== undefined) {
            limit = Number(req.query.limit);
        }
        if (req.query.project !== undefined) {
            project = { project: Number(req.query.project) };
        }
        const tasks = await Task.find(project)
            .sort({ id: 1 })
            .limit(limit);
        res.status(200).json(tasks);
    } catch (err) {
        handleError(res, err.message);
    }
});

// GET - /api/tasks/:id (single task)
router.get('/:id', async (req, res) => {
    try {
        const tasks = await Task.findOne({ id: req.params.id });
        res.status(200).json(tasks);
    } catch (err) {
        handleError(res, err.message);
    }
});

// POST - /api/tasks (creaate new task)
// prettier-ignore
router.post('/', asyncHandler(async (req, res) => {
    let data = req.body;
    if (req.body.id === undefined){
        data = {...data, id: Number(await Task.countDocuments()) + 1}
    }

    let task = await Task.create(data);
    res.status(201).json(task);
}));

// PUT - /api/tasks/:id (update existing task)
// prettier-ignore
router.put('/:id', asyncHandler(async (req, res) => {
    if (req.body._id) delete req.body._id;
    let task = await Task.update(req.body);
    res.status(201).json(task);
}));

// DELETE - /api/tasks/:id (delete task)
// prettier-ignore
router.delete('/:id', asyncHandler(async (req, res) => {
    const task = await Task.findOne({ id: req.params.id });
    if (!task) return res.send(404);
    await task.remove();
    return res.status(200).send(`Deleted task ${req.params.id}`);
}));

/**
 * Handle general errors.
 * @param {object} res The response object
 * @param {object} err The error object.
 * @return {object} The response object
 */
function handleError(res, err) {
    return res.send(500, err);
}

export default router;
