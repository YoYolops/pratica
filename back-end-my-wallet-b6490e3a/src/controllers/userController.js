import * as sessionRepository from "../repositories/sessionRepository.js";
import * as userService from "../services/userService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function signUp(req, res) {
    try {
        const { name, email, password } = req.body;
    
        if (!name || !email || !password) {
          return res.sendStatus(400);
        }
    
        const existingUserWithGivenEmail = await sessionRepository.findByEmail(email)
    
        if (existingUserWithGivenEmail) {
          return res.sendStatus(409);
        }
    
        const hashedPassword = bcrypt.hashSync(password, 12);
    
        await sessionRepository.createUser(name, email, hashedPassword)
    
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function signIn (req, res) {
    try {
      const user = await userService.authenticateUser(req.body.email, req.body.password)
      if(!user.valid) return res.sendStatus(user.error)
  
      const token = createToken(user)
  
      res.send({
        token
      });
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  function createToken(user) {
      return jwt.sign({
        id: user.id
      }, process.env.JWT_SECRET);
  }