
function signIn(){
    
    var email = document.getElementById('Email').value;
    var password = document.getElementById('Password').value;
    
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
    
    var email = document.getElementById('Email').value;
    var password = document.getElementById('Password').value;
    var username = document.getElementById('Username').value;
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(user) {
        var user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: username
        }).then(function() {
            console.error('usuario añadido con username');
        }, function(error) {
            console.error('username no cambiado');
        });        
    }, function(error) {
        // Handle Errors here.
        console.error('usuario no añadido');
        var errorCode = error.code;
        var errorMessage = error.message;

        console.error(error);
        console.error(errorCode);
        console.error(errorMessage);
        })
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

//listener
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log(user);
  } else {
    // User is signed out.
    console.log('Usuario desconectado');
  }
});


function logOut(){
firebase.auth().signOut(); 
}