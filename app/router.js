module.exports = app => {
  const { router, controller} = app;
  router.get('/', controller.home.index);
  router.get('/getId', controller.home.getId);
  router.post('/upload', controller.upload.upload);
}
