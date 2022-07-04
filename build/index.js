"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const UserController_1 = require("./UserController");
const CaseController_1 = require("./CaseController");
// creates express app, registers all controller routes and returns you express app instance
const app = (0, routing_controllers_1.createExpressServer)({
    controllers: [UserController_1.UserController, CaseController_1.CaseController], // we specify controllers we want to use
});
const PORT = process.env.PORT || 8000;
// run express application on port 3000
app.listen(PORT, () => {
    console.log("Running.... on port ", PORT);
});
