import * as Service from "../services/post-service";
import { RequestHandler } from "express";
import { httpStatus } from "../../../config/constants/http";
import DevError from "../../../error/dev-error";

export const newPost: RequestHandler = async (req, res, next) => {
  try {
    await Service.newPost(req);
    res.send({ status: "ok" });
  } catch (error) {
    next(error);
  }
};

export const getPosts: RequestHandler = async (req, res, next) => {
  try {
    const result = await Service.getPosts(req);
    res.send({ status: "ok", data: result.data });
  } catch (error) {
    next(error);
  }
};

export const likeDislike: RequestHandler = async (req, res, next) => {
  try {
    await Service.likeDislike(req);
    res.send({ status: "ok" });
  } catch (error) {
    next(error);
  }
};

export const comment: RequestHandler = async (req, res, next) => {
  try {
    await Service.comment(req);
    res.send({ status: "ok" });
  } catch (error) {
    next(error);
  }
};

export const getComments: RequestHandler = async (req, res, next) => {
  const { post_id, pagination } = req.body;

  try {
    if (
      post_id === undefined ||
      pagination === undefined ||
      pagination.limit === undefined ||
      pagination.last_id === undefined
    ) {
      throw new DevError(
        httpStatus.BAD_REQUEST,
        "missing_parameters",
        "Pastikan parameter `post_id`, `pagination.limit`, dan `pagination.last_id` telah kamu kirim"
      );
    }

    const result = await Service.getComments(req);
    res.send({
      status: "ok",
      pagination: {
        last_id: result.lastId,
        has_more: result.hasMore,
      },
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};
