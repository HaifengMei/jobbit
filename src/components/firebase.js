import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import moment from "moment";

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

  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }

  addUserProfile(role, skills, phone, adddresses, bio) {
    if (!this.auth.currentUser) {
      return alert("Not authorized");
    }

    return this.db
      .doc(`users/${this.auth.currentUser.uid}/profile/data`)
      .set({
        role,
        skills,
        phone,
        adddresses,
        bio
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  }

  async getCurrentUserProfile() {
    const profile = await this.db
      .doc(`users/${this.auth.currentUser.uid}/profile/data`)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          return doc.data();
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });

    return profile;
  }

  addUserJobs(job) {
    if (!this.auth.currentUser) {
      return alert("Not authorized");
    }

    return this.db
      .collection("users")
      .doc(this.auth.currentUser.uid)
      .collection("jobs")
      .add({
        ...job,
        timestamp: app.firestore.Timestamp.now()
      })
      .then(function(docRef) {
        // return {
        //   id: docRef.id,
        //   timestamp: moment(app.firestore.Timestamp.now()._seconds).format(
        //     "lll"
        //   ),
        //   ...job
        // };
        console.log(`Document added successfully ${docRef.id}`);
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  }

  deleteUserJob(id) {
    if (!this.auth.currentUser) {
      return alert("Not authorized");
    }

    return this.db
      .collection("users")
      .doc(this.auth.currentUser.uid)
      .collection("jobs")
      .doc(id)
      .delete()
      .then(function() {
        console.log(`Document deleted successfully`);
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
  }

  updateJob(id, update) {
    if (!this.auth.currentUser) {
      return alert("Not authorized");
    }

    return this.db
      .collection("users")
      .doc(this.auth.currentUser.uid)
      .collection("jobs")
      .doc(id)
      .update(update)
      .then(function() {
        console.log(`Document updated successfully`);
      })
      .catch(function(error) {
        console.error("Error updating document: ", error);
      });
  }

  async getCurrentUserJobs() {
    const jobs = await this.db
      .collection("users")
      .doc(this.auth.currentUser.uid)
      .collection("jobs")
      .orderBy("timestamp", "desc")
      .get()
      .then(function(snpashot) {
        if (snpashot) {
          return snpashot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
        } else {
          console.log("No such collection!");
        }
      })
      .catch(function(error) {
        console.log("Error getting collection:", error);
      });

    return jobs;
  }
}

export default new Firebase();
