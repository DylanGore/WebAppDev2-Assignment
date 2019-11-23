import express from 'express';
// import asyncHandler from 'express-async-handler';
import Task from '../models/TaskModel';

const router = express.Router();

// GET - /api/tasks (all tasks)
router.get('/', async (req, res) => {
    try {
        let limit = 0;
        let project = {};
        if (req.query.limit != undefined) {
            limit = Number(req.query.limit);
        }
        if (req.query.project != undefined) {
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
        const tasks = await Task.findOne(req.body.id);
        res.status(200).json(tasks);
    } catch (err) {
        handleError(res, err.message);
    }
});

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
