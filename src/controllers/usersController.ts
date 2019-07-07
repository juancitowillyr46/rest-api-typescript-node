import { Request, Response } from "express";
import UserModel, { User } from "../models/User";
import Joi from "@hapi/joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/app";

class UsersController {
  public async postUsers(req: Request, res: Response) {
    const { email, fullname, password } = req.body;

    // Validation
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

    // Check Email
    const emailExist = await UserModel.findOne({ email: email });
    if (emailExist) return res.status(400).send("Email already exists");

    // Encrypt Passwords
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new User
    const user: User = new UserModel({
      email,
      fullname,
      password: hashedPassword
    });

    try {
      const userSave = await user.save();
      return res.status(200).send({ user: userSave });
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async login(req: Request, res: Response) {
    const schema = {
      username: Joi.string()
        .min(6)
        .email()
        .required(),
      password: Joi.string()
        .min(6)
        .required()
    };
    const { error } = Joi.validate(req.body, schema);
    const user = await UserModel.findOne({ email: req.body.username });

    if (error) return res.status(400).send(error.details[0].message);

    if (!user) return res.status(400).send("Email not already exist");

    const validPass = await bcrypt.compare(req.body.password, user.password);

    if (!validPass) return res.status(400).send("Invalid password");

    console.log(config.getJwtTokenSecret());

    const token = jwt.sign({ _id: user._id }, config.getJwtTokenSecret());

    return res.header("auth-token", token).send(token);

    //return res.status(200).send(req.body);
  }

  public async getUsers(req: Request, res: Response) {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) return res.status(204).send("Not Result");

    return res.send(user);
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
