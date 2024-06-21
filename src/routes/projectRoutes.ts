import { Router } from "express"
import { ProjectController } from "../controllers/ProjectController"
import { body, param } from "express-validator"
import { handleInputErrors } from "../middleware/validation"
const router = Router()

router.post(
  "/",
  body("projectName").notEmpty().withMessage("Project name is required"),

  body("clientName").notEmpty().withMessage("Name is required"),

  body("description").notEmpty().withMessage("Description is required"),

  handleInputErrors,

  ProjectController.createProjects
)

router.get("/", ProjectController.getAllProjects)

router.get(
  "/:id",
  param("id").isMongoId().withMessage("ID invalid"),
  handleInputErrors,
  ProjectController.getProjectById
)
router.put(
  "/:id",
  param("id").isMongoId().withMessage("ID invalid"),

  body("projectName").notEmpty().withMessage("Project name is required"),

  body("clientName").notEmpty().withMessage("Name is required"),

  body("description").notEmpty().withMessage("Description is required"),

  handleInputErrors,
  ProjectController.updateProject
)

export default router
