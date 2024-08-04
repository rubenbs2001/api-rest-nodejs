const createError = require("http-errors");

const debug = require("debug")("app:module-users-controller");

const { UsersService } = require("./services");

const { Response } = require("../common/response");

module.exports.UsersController = {
  getUsers: async (req, res) => {
    try {
      let users = await UsersService.getAll();
      Response.success(res, 200, "Lista de usuarios", users);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  getUser: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      let users = await UsersService.getById(id);
      if (!users) {
        Response.error(res, new createError.NotFound());
      }else{
        Response.success(res, 200, `Usuario ${id}`, users);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  createUser: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      }else{
        const insertedId = await UsersService.create(body);
        Response.success(res, 201, "Usuario insertado", insertedId);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  updateUser: async (req, res) => {
    try {
      const {
        body,
        params: { id },
      } = req;
      let user = await UsersService.updateUser(id, body);
      if (!user) {
        Response.error(res, new createError.NotFound());
      }else{
        Response.success(res, 200, `Usuario ${id} actualizado`, user);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      let user = await UsersService.deleteUser(id);
      if (!user) {
        Response.error(res, new createError.NotFound());
      }else{
        Response.success(res, 200, `Uusario ${id} eliminado`, user);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};
