const firestore = require('../config/firestoreService');

class Users {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  static async createUser(username, email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userRef = firestore.collection('user').doc(username);

      await userRef.set({
        username,
        email,
        password: hashedPassword,
      });

      return { success: true, message: 'User registered successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async findUserByUsername(username) {
    try {
      const userRef = firestore.collection('users').doc(username);
      const snapshot = await userRef.get();

      if (!snapshot.exists) {
        return { success: false, error: 'User not found' };
      }

      return { success: true, data: snapshot.data() };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async verifyPassword(password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      return false;
    }
  }
}

module.exports = Users;
