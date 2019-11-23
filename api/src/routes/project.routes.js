import express from 'express';
// import asyncHandler from 'express-async-handler';
import Project from '../models/ProjectModel';

const router = express.Router();

// GET - /api/projects (all projects)
router.get('/', async (req, res) => {
    try {
        let limit = 0;
        if (req.query.limit != undefined) {
            limit = Number(req.query.limit);
        }
        const projects = await Project.find()
            .sort({ id: 1 })
            .limit(limit);
        res.status(200).json(projects);
    } catch (err) {
        handleError(res, err.message);
    }
});

// GET - /api/projects/:id (single project)
router.get('/:id', async (req, res) => {
    try {
        const projects = await Project.findOne(req.body.id);
        res.status(200).json(projects);
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
