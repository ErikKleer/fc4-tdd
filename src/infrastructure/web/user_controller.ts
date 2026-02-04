import { Request, Response } from "express";
import { UserService } from "../../application/services/user_service";
import { User } from "../../domain/entities/user";

export class UserController {
  constructor(private readonly userService: UserService) {}

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const { id, name } = req.body;

      const user = new User(id, name);

      await this.userService.createUser(user);

      return res.status(201).json({ id: user.getId(), name: user.getName() });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
