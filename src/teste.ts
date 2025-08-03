import { Users } from "./models/userModel";
import { Connection } from "./database/database";



async function testeServices() {
    await Connection.initialize();



    const userRepository = Connection.getRepository(Users);
    const users = await userRepository.find();
    console.log(users);

}

testeServices();