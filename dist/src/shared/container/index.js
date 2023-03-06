"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
require("./providers");
const UsersRepository_1 = require("../../modules/accounts/infra/typeorm/repositories/UsersRepository");
const CarsImagesRepository_1 = require("../../modules/cars/infra/typeorm/repositories/CarsImagesRepository");
const CarsRepository_1 = require("../../modules/cars/infra/typeorm/repositories/CarsRepository");
const CategoriesRepository_1 = require("../../modules/cars/infra/typeorm/repositories/CategoriesRepository");
const SpecificationsRepository_1 = require("../../modules/cars/infra/typeorm/repositories/SpecificationsRepository");
const RentalsRepository_1 = require("../../modules/rentals/infra/typeorm/repositories/RentalsRepository");
const UsersTokensRepository_1 = require("../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository");
// singleton é o nome dado para um INSTANCE que geralmente serve pra indicar se ja existe determinada classe
tsyringe_1.container.registerSingleton("CategoriesRepository", // nomeclatura do singleton
CategoriesRepository_1.CategoriesRepository // classe
);
tsyringe_1.container.registerSingleton("SpecificationsRepository", SpecificationsRepository_1.SpecificationsRepository);
tsyringe_1.container.registerSingleton("UsersRepository", UsersRepository_1.UsersRepository);
tsyringe_1.container.registerSingleton("CarsRepository", CarsRepository_1.CarsRepository);
tsyringe_1.container.registerSingleton("CarsImagesRepository", CarsImagesRepository_1.CarsImagesRepository);
tsyringe_1.container.registerSingleton("RentalsRepository", RentalsRepository_1.RentalsRepository);
tsyringe_1.container.registerSingleton("UsersTokensRepository", UsersTokensRepository_1.UsersTokensRepository);
