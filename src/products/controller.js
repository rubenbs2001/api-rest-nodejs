const createError = require("http-errors");

const debug = require("debug")("app:module-products-controller");

const { ProductsService } = require("./services");

const { Response } = require("../common/response");

module.exports.ProductsController = {
  getProducts: async (req, res) => {
    try {
      let products = await ProductsService.getAll();
      Response.success(res, 200, "Lista de productos", products);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  getProduct: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      let product = await ProductsService.getById(id);
      if (!product) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, `Producto ${id}`, product);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  createProduct: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const insertedId = await ProductsService.create(body);
        Response.success(res, 201, "Producto insertado", insertedId);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  generateReport: async (req, res) => {
    try {
      ProductsService.generateReport("Inventario", res);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  updateProduct: async (req, res) => {
    try {
      const {
        body,
        params: { id },
      } = req;
      let product = await ProductsService.updateProduct(id, body);
      if (!product) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, `Producto ${id} actualizado`, product);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      let product = await ProductsService.deleteProduct(id);
      if (!product) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, `Producto ${id} eliminado`, product);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};
