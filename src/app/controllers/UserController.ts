import { getRepository } from "typeorm";
import { Request, Response } from "express";

import { User } from "../models/User";

class UserController {
  async index(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const users = await userRepository.find();

    return res.send(users);
  }
}

export default new UserController();
