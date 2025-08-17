import { Router } from "express";
import { LoginController } from "../controllers/LoginUser/LoginController";
import { RegisterControler } from "../controllers/LoginUser/RegisterController";
import { VerifyController } from "../controllers/LoginUser/VerifyController";

const login = Router();
const loginController = new LoginController()
const registerController = new RegisterControler();
const verifyController =  new VerifyController();

login.post('/login', (req, res) => loginController.handle(req, res));
login.post('/register', (req, res) => registerController.handle(req, res));
login.post('/verify-code', (req, res) => verifyController.handleController(req, res));

export default login;