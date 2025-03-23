module.exports = class UserDto {
  email;
  id;
  isVerified;

  constructor(model) {
    this.email = model.email;
    this.id = model.id;
    this.isVerified = model.isVerified;
  }
};
