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

  getCurrentUid() {
    return this.auth.currentUser && this.auth.currentUser.uid;
  }

  addUserProfile(role, skills, phone, adddresses, bio, name) {
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
        bio,
        name
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  }

  async getCurrentUserProfile(id) {
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

  async getUserProfile(uid) {
    const profile = await this.db
      .doc(`users/${uid}/profile/data`)
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
        console.log("Error getting user jobs:", error);
      });

    return jobs;
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
        console.log(`Job added successfully ${docRef.id}`);
      })
      .catch(function(error) {
        console.error("Error writing job: ", error);
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
        console.log(`Job deleted successfully`);
      })
      .catch(function(error) {
        console.error("Error removing job: ", error);
      });
  }

  updateUserJob(id, update) {
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
        console.log(`Job updated successfully`);
      })
      .catch(function(error) {
        console.error("Error updating job: ", error);
      });
  }

  addListedJobs(jobId) {
    if (!this.auth.currentUser) {
      return alert("Not authorized");
    }

    return this.db
      .collection("listed_jobs")
      .doc(jobId)
      .set({
        listerId: this.auth.currentUser.uid,
        jobId,
        timestamp: app.firestore.Timestamp.now(),
        applicants: []
      })
      .then(function() {
        console.log(`Job listed successfully`);
      })
      .catch(function(error) {
        console.error("Error writing listed job: ", error);
      });
  }

  removeListedJobs(jobId) {
    if (!this.auth.currentUser) {
      return alert("Not authorized");
    }

    return this.db
      .collection("listed_jobs")
      .doc(jobId)
      .delete()
      .then(function() {
        console.log(`Job unlisted successfully`);
      })
      .catch(function(error) {
        console.error("Error removing listed job: ", error);
      });
  }

  async getListedJobs() {
    const jobs = await this.db
      .collection("listed_jobs")
      .orderBy("timestamp", "desc")
      .get()
      .then(async snpashot => {
        if (snpashot) {
          const jobRefs = snpashot.docs.map(doc => doc.data());
          const jobs = [];
          await Promise.all(
            jobRefs.map(async jobRef => {
              const listerDetails = await this.getUserProfile(jobRef.listerId);
              const jobDetails = await this.getJobDetails(jobRef);
              jobs.push({ ...listerDetails, ...jobDetails, ...jobRef });
            })
          );
          return jobs;
        } else {
          console.log("No such collection!");
        }
      })
      .catch(function(error) {
        console.log("Error getting user jobs:", error);
      });

    return jobs;
  }

  async getJobDetails(jobRef) {
    const jobDetails = await this.db
      .collection("users")
      .doc(jobRef.listerId)
      .collection("jobs")
      .doc(jobRef.jobId)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          return doc.data();
        } else {
          console.log("No job details");
        }
      })
      .catch(function(error) {
        console.log("Error getting user jobs:", error);
      });

    return jobDetails;
  }

  async updateListedJob(jobId, update) {
    if (!this.auth.currentUser) {
      return alert("Not authorized");
    }

    return this.db
      .collection("listed_jobs")
      .doc(jobId)
      .update(update)
      .then(function() {
        console.log(`Listed Job updated successfully`);
      })
      .catch(function(error) {
        console.error("Error updating listed job: ", error);
      });
  }

  async getListedJob(jobId) {
    const jobs = await this.db
      .collection("listed_jobs")
      .doc(jobId)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          return doc.data();
        } else {
          return false;
        }
      })
      .catch(function(error) {
        console.log("Error getting user jobs:", error);
      });

    return jobs;
  }

  async getApplicants() {
    const userJobs = await this.getCurrentUserJobs();
    const applicants = [];
    await Promise.all(
      userJobs.map(async job => {
        const listedJob = await this.getListedJob(job.id);
        if (listedJob) {
          console.log(listedJob);
          const applicantIds = listedJob.applicants;
          await Promise.all(
            applicantIds.map(async id => {
              const userProfile = await this.getUserProfile(id);
              applicants.push({
                name: userProfile.name,
                skills: userProfile.skills,
                appliedJob: job.name
              });
            })
          );
        }
      })
    );
    console.log(applicants);
    return applicants;
  }
}

export default new Firebase();
