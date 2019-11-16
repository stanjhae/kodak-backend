const Post = require('../models/Post');
const response = require('../utils/response');
const http = require('../utils/HttpStats');

const moduleId = '/api/posts/';

module.exports = {
  createImage: async (req, res) => {
    const img = req.file ? req.file : null;
    const respond = response.success(res);
    const respondErr = response.failure(res, moduleId);
    const props = ['category'];

    try {
      const post = new Post();
      props.forEach((prop) => {
        post[prop] = req.body[prop];
      });
      if (img) {
        post.url = img.location;
      }
      await post.save();
      respond(http.CREATED, post);
    } catch (err) {
      console.log(err);
      respondErr(http.SERVER_ERROR, err.message, err);
    }
  },
  getImages: async (req, res) => {
    const respond = response.success(res);
    const respondErr = response.failure(res, moduleId);
    try {
      const posts = await Post.find().sort({ createdAt: -1 }).exec();
      respond(http.OK, posts);
    } catch (err) {
      respondErr(http.SERVER_ERROR, err.message, err);
    }
  },
  likeImage: async (req, res) => {
    const respond = response.success(res);
    const respondErr = response.failure(res, moduleId);
    try {
      const image = await Post.findById(req.body.image).exec();
      image.liked = !image.liked;
      await image.save();
      respond(http.OK, image);
    } catch (err) {
      respondErr(http.SERVER_ERROR, err.message, err);
    }
  },
  deleteImage: async (req, res) => {
    const respond = response.success(res);
    const respondErr = response.failure(res, moduleId);
    try {
      await Post.findOneAndDelete({ _id: req.params.post }).exec();
      respond(http.OK, {});
    } catch (err) {
      respondErr(http.SERVER_ERROR, err.message, err);
    }
  },
};
