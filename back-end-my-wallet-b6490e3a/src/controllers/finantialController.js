import * as financialRepository from "../repositories/financialRepository.js";
import * as sessionRepository from "../repositories/sessionRepository.js";

export async function createEvent (req, res) {
    try {
      const authorization = req.headers.authorization || "";
      const token = authorization.split('Bearer ')[1];
  
      const user = sessionRepository.verifyToken(token)
      if(!user) return res.sendStatus(401)
  
      const { value, type } = req.body;
  
      if (!value || !type) {
        return res.sendStatus(400);
      }
  
      if (!['INCOME', 'OUTCOME'].includes(type)) {
        return res.sendStatus(400);
      }
  
      if (value < 0) {
        return res.sendStatus(400);
      }
  
      await financialRepository.createFinancialEvent(user.id, value, type)
  
      res.sendStatus(201);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

export async function getFinantialEvent(req, res) {
try {
    const authorization = req.headers.authorization || "";
    const token = authorization.split('Bearer ')[1];

    const user = sessionRepository.verifyToken(token)
    if(!user) return res.sendStatus(401)

    const events = await financialRepository.findByUserId(user.id)

    res.send(events.rows);
} catch (err) {
    console.error(err);
    res.sendStatus(500);
}
}

export async function getFinantialEventSum(req, res) {
    try {
      const authorization = req.headers.authorization || "";
      const token = authorization.split('Bearer ')[1];
  
      const user = sessionRepository.verifyToken(token)
      if(!user) return res.sendStatus(401)
  
      const events = await financialRepository.findByUserId(user.id)
  
      const sum = events.rows.reduce((total, event) => event.type === 'INCOME' ? total + event.value : total - event.value, 0);
  
      res.send({ sum });
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }