import { Router } from "express";
import { LoginController } from "../controllers/LoginUser/LoginController";
import { RegisterControler } from "../controllers/LoginUser/RegisterController";

const login = Router();
const loginController = new LoginController()
const registerController = new RegisterControler();

login.post('/login', (req, res) => loginController.handle(req, res));
login.post('/register', (req, res) => registerController.handle(req, res));

export default login;