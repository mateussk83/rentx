import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { ListCategoryController } from "./listCategoriesController";
import { ListCategoryUseCase } from "./ListCategoriesUseCase";

const categoriesRepository = CategoriesRepository.getInstance();

const listCategoryUseCase = new ListCategoryUseCase(categoriesRepository);

const listCategoriesController = new ListCategoryController(listCategoryUseCase);

export { listCategoriesController };