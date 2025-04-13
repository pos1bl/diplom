export default class UserDto {
  email;
  id;
  isActivated;
  role;
  name;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.role = model.role;
    this.name = model.name;
  }
}