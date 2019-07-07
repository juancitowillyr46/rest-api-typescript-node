import { Router } from "express";
import usersController from "../controllers/usersController";
import jwtToken from "../lib/jwtToken";

const router: Router = Router();

router.post("/register", usersController.postUsers);
router.post("/login", usersController.login);
router.post("/", jwtToken.verifyToken, usersController.getUsers);
router.delete("/", usersController.deleteUsers);
router.put("/", usersController.putUsers);

export default router;
