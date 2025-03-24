module.exports = class UserDto {
  email;
  name;
  id;
  isVerified;

  constructor(model) {
    this.email = model.email;
    this.name = model.name;
    this.id = model.id;
    this.isVerified = model.isVerified;
  }
};
