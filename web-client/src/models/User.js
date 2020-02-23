export default class User {
  _id = "";
  _password = "";
  _email = "";
  _firstName = "";
  _lastName = "";
  _initials = "";
  _rootDirectoryId = "";

  adaptFromForm({ password, email, firstName, lastName }) {
    this._password = password;
    this._email = email;
    this._firstName = firstName;
    this._lastName = lastName;
  }

  adaptFromNetwork(data) {
    const { _id, email, firstName, lastName, initials, rootDirectoryId } = data;

    this._id = _id;
    this._email = email;
    this._firstName = firstName;
    this._lastName = lastName;
    this._initials = initials;
    this._rootDirectoryId = rootDirectoryId;
  }

  adaptToNetwork() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      rootDirectoryId: "",
      initials: ""
    };
  }

  // Getter e Setter

  get password() {
    return this._password;
  }
  set password(value) {
    this._password = value;
  }
  get email() {
    return this._email;
  }
  set email(value) {
    this._email = value;
  }

  get firstName() {
    return this._firstName;
  }
  set firstName(value) {
    this._firstName = value;
  }

  get lastName() {
    return this._lastName;
  }
  set lastName(value) {
    this._lastName = value;
  }

  get initials() {
    return this._initials;
  }
  set initials(value) {
    this._initials = value;
  }

  get rootDirectoryId() {
    return this._rootDirectoryId;
  }
  get id() {
    return this._id;
  }
}
