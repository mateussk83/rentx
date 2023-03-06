"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentalRoutes = void 0;
const express_1 = require("express");
const CreateRentalController_1 = require("../../../../modules/rentals/useCases/createRental/CreateRentalController");
const DevolutionRentalController_1 = require("../../../../modules/rentals/useCases/devolutionRental/DevolutionRentalController");
const ListRentalsByUserController_1 = require("../../../../modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController");
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const rentalRoutes = (0, express_1.Router)();
exports.rentalRoutes = rentalRoutes;
const createRentalController = new CreateRentalController_1.CreateRentalController();
const devolutionController = new DevolutionRentalController_1.DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController_1.ListRentalsByUserController();
rentalRoutes.post("/", ensureAuthenticated_1.ensureAuthenticated, createRentalController.handle);
rentalRoutes.post("/devolution/:id", ensureAuthenticated_1.ensureAuthenticated, devolutionController.handle);
rentalRoutes.get("/user", ensureAuthenticated_1.ensureAuthenticated, listRentalsByUserController.handle);
