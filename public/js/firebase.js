// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDmOZ-T8hw2juYZ-3x31SQpUoayLmAwkbk",
    authDomain: "base-de-imagenes.firebaseapp.com",
    databaseURL: "https://base-de-imagenes.firebaseio.com",
    projectId: "base-de-imagenes",
    storageBucket: "base-de-imagenes.appspot.com",
    messagingSenderId: "473956583897"
  };
  firebase.initializeApp(config);

    var auth = firebase.auth();
    var storageRef = firebase.storage().ref();

    function handleFileSelect(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      var file = evt.target.files[0];

      var metadata = {
        'contentType': file.type
      };

      // Push to child path.
      // [START oncomplete]
      storageRef.child('images/' + Date.now() + file.name).put(file, metadata).then(function(snapshot) {
        console.log('Subido', snapshot.totalBytes, 'bytes.');
        console.log(snapshot.metadata);
        var url = snapshot.downloadURL;
        console.log('Archivo en ', url);
        // [START_EXCLUDE]
    localStorage.setItem ("Avatar",url);
    document.getElementById('linkAvatar').innerHTML = '<img class="avatarform" src="' +  url + '"></img>';
        // [END_EXCLUDE]
      }).catch(function(error) {
        // [START onfailure]
        console.error('Error en la subida:', error);
        // [END onfailure]
      });
      // [END oncomplete]
    }


