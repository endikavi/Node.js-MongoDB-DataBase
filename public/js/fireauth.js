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
            console.log('usuario añadido con username');
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

function logInGoogle(){
    
     var provider = new firebase.auth.GoogleAuthProvider(); 
        
        firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
       
        }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
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

function viewRegisterForm(){
    document.getElementById('Titulo').style.display = 'none';
    document.getElementById('Reset').style.display = 'block';
    document.getElementById('Email').style.display = 'block';
    document.getElementById('Password').style.display = 'block';
    document.getElementById('Username').style.display = 'block';
    document.getElementById('Accept').style.display = 'block';
    document.getElementById('Register-button').style.display = 'block';
    document.getElementById('Register').style.display = 'none';
    document.getElementById('Login').style.display = 'none';
    document.getElementById('Google').style.display = 'none';
}

function viewLoginForm(){
    document.getElementById('Titulo').style.display = 'none';
    document.getElementById('Reset').style.display = 'block';
    document.getElementById('Password').style.display = 'block';
    document.getElementById('Username').style.display = 'none';
    document.getElementById('Email').style.display = 'block';
    document.getElementById('Accept').style.display = 'none';
    document.getElementById('Login-button').style.display = 'block';
    document.getElementById('Register').style.display = 'none';
    document.getElementById('Login').style.display = 'none';
    document.getElementById('Google').style.display = 'none';
}

function viewReset(){
    document.getElementById('Titulo').style.display = 'block';
    document.getElementById('Reset').style.display = 'none';
    document.getElementById('Email').style.display = 'none';
    document.getElementById('Password').style.display = 'none';
    document.getElementById('Username').style.display = 'none';
    document.getElementById('Accept').style.display = 'none';
    document.getElementById('Register-button').style.display = 'none';
    document.getElementById('Login-button').style.display = 'none';
    document.getElementById('Register').style.display = 'block';
    document.getElementById('Login').style.display = 'block';
    document.getElementById('Google').style.display = 'block';
}

