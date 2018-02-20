
function singIn(){
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
        console.log('Wrong password.');
    } else {
        console.log(errorMessage);
    }
        console.log(error);
    });
}

function logIn(){
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/weak-password') {
        console.log('The password is too weak.');
    } else {
        console.log(errorMessage);
    }
        console.log(error);
    });
}

function emailVerify(){
firebase.auth().currentUser.sendEmailVerification().then(function() {
  // Email Verification sent!
  console.log('Email Verification Sent!');
});
}

function resetPassword(){
firebase.auth().sendPasswordResetEmail(email).then(function() {
  // Password Reset Email Sent!
  console.log('Password Reset Email Sent!');
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode == 'auth/invalid-email') {
    console.log(errorMessage);
  } else if (errorCode == 'auth/user-not-found') {
    console.log(errorMessage);
  }
  console.log(error);
});
}

function listener(){
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log(user);
  } else {
    // User is signed out.
    console.log('Usuario desconectado');
  }
});
}

function logOut(){
firebase.auth().signOut(); 
}