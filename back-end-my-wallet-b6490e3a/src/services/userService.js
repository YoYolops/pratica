import bcrypt from "bcrypt";
import * as sessionRepository from "../repositories/sessionRepository.js";

export async function authenticateUser(email, password) {

    if (!email || !password) {
      return {
        valid: false,
        error: 400
      }
    }

    const user = await sessionRepository.findByEmail(email)

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return {
        valid: false,
        error: 401
      }
    }

    return user
}

