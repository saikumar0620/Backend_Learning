import { v4 as uuidv4, v4 } from 'uuid';

class Users {
  constructor()
  {
    this.users =[]
  }
  createNewUser(newUserData) {
    newUserData.id = uuidv4();
    // console.log(newUserData)
    const userWithSameEmail = this.users.find(user => user.email === newUserData.email);
    if (userWithSameEmail) {
      throw new Error('User with the same email already exists')
    }

    this.users.push(newUserData)
    return newUserData;
  
  }

  findUserByEmail(userEmail) {
   return this.users.find((user) => user.email === userEmail)
  
 }
  
}
export default Users;