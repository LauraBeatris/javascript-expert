class User {
  constructor({ id, name, profession, age }){
    this.id = parseInt(id);
    this.age = parseInt(age);
    this.name = name;
    this.profession = profession;
  }
}

module.exports = User