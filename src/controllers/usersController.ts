import { Router, Request, Response } from "express";
import UserModel, { User } from "../models/User";
import Joi from "@hapi/joi";

class UsersController {
  public async postUsers(req: Request, res: Response) {
    const schema = {
      fullname: Joi.string()
        .min(6)
        .required(),
      email: Joi.string()
        .email()
        .min(6)
        .required(),
      password: Joi.string()
        .min(8)
        .required()
    };

    const { error } = Joi.validate(req.body, schema);

    if (error) return res.status(400).send(error.details[0].message);

    const { email, fullname, password } = req.body;
    const user: User = new UserModel({ email, fullname, password });

    try {
      const userSave = await user.save();
      return res.status(200).send({ user: userSave });
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public getUsers(req: Request, res: Response) {
    return res.send("Hola mundo getUsers");
  }

  public deleteUsers(req: Request, res: Response) {
    return res.send("Hola mundo deleteUsers");
  }

  public putUsers(req: Request, res: Response) {
    return res.send("Hola mundo putUsers");
  }
}

const usersController = new UsersController();

export default usersController;
