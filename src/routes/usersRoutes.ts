import { Router } from "express";
import usersController from "../controllers/usersController";

const router: Router = Router();

router.post("/register", usersController.postUsers);
router.post("/login", usersController.login);
router.get("/", usersController.getUsers);
router.delete("/", usersController.deleteUsers);
router.put("/", usersController.putUsers);

export default router;
