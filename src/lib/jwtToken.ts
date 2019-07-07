import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../src/config/app";

class JwtToken {
  public verifyToken(req: Request, res: Response, next: any) {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Access Denied");

    try {
      const verified = jwt.verify(token, config.getJwtTokenSecret());
      // req.user = verified;
      next();
    } catch (error) {
      res.status(401).send("Access Denied");
    }
  }
}

const jwtToken = new JwtToken();

export default jwtToken;
