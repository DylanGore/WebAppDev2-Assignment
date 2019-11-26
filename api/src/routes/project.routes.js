import express from 'express';
import asyncHandler from 'express-async-handler';
import Project from '../models/ProjectModel';

const router = express.Router();

// GET - /api/projects (all projects)
router.get('/', async (req, res) => {
    try {
        let limit = 0;
        if (req.query.limit !== undefined) {
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
        const project = await Project.findOne({ id: req.params.id });
        res.status(200).json(project);
    } catch (err) {
        handleError(res, err.message);
    }
});

// POST - /api/projects (create new project)
// prettier-ignore
router.post('/', asyncHandler(async (req, res) => {
    let data = req.body;
    if (req.body.id === undefined){
        data = {...data, id: Number(await Project.countDocuments()) + 1}
    }

    let project = await Project.create(data);
    res.status(201).json(project);
}));

// PUT - /api/projects/:id (update existing project)
// prettier-ignore
router.put('/:id', asyncHandler(async (req, res) => {
    if (req.body._id) delete req.body._id;
    let project = await Project.update(req.body);
    res.status(201).json(project);
}));

// DELETE - /api/projects/:id (delete project)
// prettier-ignore
router.delete('/:id', asyncHandler(async (req, res) => {
    const project = await Project.findOne({ id: req.params.id });
    if (!project) return res.send(404);
    await project.remove();
    return res.status(200).send(`Deleted project ${req.params.id}`);
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
