import * as Service from "../services/user-service.js";

export const details = async (req, res, next) => {
  try {
    const result = await Service.details(req);
    res.send({ status: "ok", data: result.data });
  } catch (error) {
    next(error);
  }
};

export const follow = async (req, res, next) => {
  try {
    await Service.follow(req);
    res.send({ status: "ok" });
  } catch (error) {
    next(error);
  }
}
