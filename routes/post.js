const postController = require('../controllers/post.ctrl');

const upload = require('../utils/upload').image();


module.exports = (router) => {
  router
    .route('/posts/')
    .post(upload.single('image'), postController.createImage);

  router
    .route('/posts/all')
    .get(postController.getImages);

  router
    .route('/posts/:post')
    .delete(postController.deleteImage);

  router
    .route('/posts/like')
    .put(postController.likeImage);
};
