import { Connection } from "./database/database";
import { dashboardService } from "./services/screens/DashboardService";


async function testeServices() {
    await Connection.initialize();

    const init = new dashboardService('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxlYW5kcm9hbHZlcy53ZWJkZXZlbG9wZXJAZ21haWwuY29tIiwiaWF0IjoxNzU0Mjc5MDg4LCJleHAiOjE3NTQyODI2ODh9.ejJFj1C58et35HOhEIX4O2y1lnZuIUc3CvcYZ0Va1LI')
    const result = await init.getUser();
    
    

}

testeServices();