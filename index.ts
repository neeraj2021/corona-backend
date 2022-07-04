import { createExpressServer } from "routing-controllers";
import { UserController } from "./UserController";
import { CaseController } from "./CaseController";

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
  controllers: [UserController, CaseController], // we specify controllers we want to use
});
const PORT = process.env.PORT || 8000;

// run express application on port 3000
app.listen(PORT, () => {
  console.log("Running.... on port ", PORT);
});
