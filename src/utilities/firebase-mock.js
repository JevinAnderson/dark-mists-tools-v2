const auth = () => ({
  currentUser: {
    updateProfile: (...args) => {
      console.log('updateProfile args', args);

      return new Promise();
    }
  },
  onAuthStateChanged: handler => {},
  signInWithEmailAndPassword: (email, password) =>
    new Promise((resolve, reject) => {
      reject(new Error('Firebase unavailable for logins.'));
    }),
  signout: () =>
    new Promise((resolve, reject) => {
      reject(new Error('Firebase unavailable for logouts.'));
    })
});

const database = app => ({
  goOffline: () => {},
  goOnline: () => {},
  ref: path => ({
    on: (eventType, callback, cancelCallbackOrContext, context) => {},
    off: (eventType, callback, context) => {},
    set: value => {}
  })
});

database.enableLogging = (logger, persistant) => {};

const initializeApp = config => {};

const fb = {
  auth,
  database,
  initializeApp
};

export default fb;
