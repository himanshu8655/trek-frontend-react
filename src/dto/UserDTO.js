class UserDTO {
    constructor(uid, name, email) {
      this.uid = uid;
      this.name = name;
      this.email = email;
    }
  
    getUID() {
      return this.uid;
    }
  
    setUID(uid) {
      this.uid = uid;
    }
  
    getName() {
      return this.name;
    }
  
    setName(name) {
      this.name = name;
    }
  
    getEmail() {
      return this.email;
    }
  
    setEmail(email) {
      this.email = email;
    }
  
  }
  
  export default UserDTO;
  