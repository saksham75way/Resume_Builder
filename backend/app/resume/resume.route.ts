import express from "express";
import { ResumeController } from "./resume.controller";

const router = express.Router();
const resumeController = new ResumeController();

/**
 * @swagger
 * /api/resumes/{id}:
 *   get:
 *     summary: Get a resume by ID
 *     description: Fetches a resume based on the provided ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the resume to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resume found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resume'
 *       404:
 *         description: Resume not found
 *       400:
 *         description: Invalid ID format
 */
router.get("/:id", resumeController.getResumeById);

/**
 * @swagger
 * /api/resumes/create:
 *   post:
 *     summary: Create a new resume
 *     description: Creates a new resume entry based on the provided data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resume'
 *     responses:
 *       201:
 *         description: Resume created successfully
 *       400:
 *         description: Invalid input data
 */
router.post("/create", resumeController.createResume);

/**
 * @swagger
 * /api/resumes/{id}:
 *   put:
 *     summary: Update an existing resume
 *     description: Updates the resume information for a specific resume ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the resume to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resume'
 *     responses:
 *       200:
 *         description: Resume updated successfully
 *       404:
 *         description: Resume not found
 *       400:
 *         description: Invalid input data
 */
router.put("/:id", resumeController.updateResume);

/**
 * @swagger
 * /api/resumes/{id}:
 *   delete:
 *     summary: Delete a resume by ID
 *     description: Deletes the resume based on the provided ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the resume to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resume deleted successfully
 *       404:
 *         description: Resume not found
 *       400:
 *         description: Invalid ID format
 */
router.delete("/:id", resumeController.deleteResume);

export default router;
