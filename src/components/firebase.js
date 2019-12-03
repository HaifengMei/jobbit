import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

const config = {
  apiKey: "AIzaSyD2s3LaOFh4_5QcwJCrVx0sgYV3KUS67ow",
  authDomain: "jobbit-15765.firebaseapp.com",
  databaseURL: "https://jobbit-15765.firebaseio.com",
  projectId: "jobbit-15765",
  storageBucket: "jobbit-15765.appspot.com",
  messagingSenderId: "178724327877",
  appId: "1:178724327877:web:a4a311f0d54ec62460fbac",
  measurementId: "G-3M4X3W5J2G"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name
    });
  }

  addUserData(role, skills) {
    if (!this.auth.currentUser) {
      return alert("Not authorized");
    }

    return this.db.doc(`jobbit_users/${this.auth.currentUser.uid}`).set({
      role,
      skills
    });
  }

  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }

  async getCurrentUserData() {
    const userData = await this.db
      .doc(`jobbit_users/${this.auth.currentUser.uid}`)
      .get();

    const userDetails = {
      role: userData.get("role"),
      skills: userData.get("skills")
    };
    return userDetails;
  }
}

export default new Firebase();
