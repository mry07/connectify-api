import * as Service from "../services/post-service.js";

export const newPost = async (req, res, next) => {
  try {
    await Service.newPost(req);
    res.send({ status: "ok" });
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const result = await Service.getPosts(req);
    res.send({ status: "ok", data: result.data });
  } catch (error) {
    next(error);
  }
};

export const likeDislike = async (req, res, next) => {
  try {
    await Service.likeDislike(req);
    res.send({ status: "ok" });
  } catch (error) {
    next(error);
  }
};

export const comment = async (req, res, next) => {
  try {
    await Service.comment(req);
    res.send({ status: "ok" });
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req, res, next) => {
  try {
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
