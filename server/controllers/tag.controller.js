class TagController {
  async getById(req, res, next) {
    try {
      const { id } = req.params;

    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TagController();
