export default class Directory {
  _id = null;
  _title = null;
  _usersId = [];
  _parentId = null;
  _children = [];
  _creationDate = null;
  _type = "dir";
  _icon = "folder";

  adaptFromSocket({ _id, title, usersId, children, parentId, creationDate }) {
    this._id = _id;
    this.title = title;
    this.usersId = usersId;
    this.parentId = parentId;
    this.children = [...children];
    this.creationDate = creationDate;
  }

  adaptToSocket({ title, userId, parentId }) {
    this.title = title;
    this.usersId = [userId];
    this.parentId = parentId;

    return {
      title: this.title,
      usersId: [...this.usersId],
      parentId: this.parentId,
      type: this.type,
      icon: this.icon
    };
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }
  set title(value) {
    this._title = value;
  }

  get usersId() {
    return this._usersId;
  }
  set usersId(value) {
    this._usersId = value;
  }

  get parentId() {
    return this._parentId;
  }
  set parentId(value) {
    this._parentId = value;
  }

  get children() {
    return this._children;
  }
  set children(value) {
    this._children = value;
  }

  get creationDate() {
    return this._creationDate;
  }
  set creationDate(value) {
    this._creationDate = value;
  }

  get type() {
    return this._type;
  }
  set type(value) {
    this._type = value;
  }

  get icon() {
    return this._icon;
  }
  set icon(value) {
    this._icon = value;
  }
}
