const firebaseConfig = {
    apiKey: "AIzaSyCfQH-ZuXGquxoYhyknsUl_N6ezRo_m_2E",
    authDomain: "vaijnath-mandir-halvad.firebaseapp.com",
    projectId: "vaijnath-mandir-halvad",
    storageBucket: "vaijnath-mandir-halvad.appspot.com",
    messagingSenderId: "394996526885",
    appId: "1:394996526885:web:d164eeb6842b8c7ca2f4cc",
    measurementId: "G-P4H5WC0SKJ"
  };

  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();
  const storageRef = storage.ref();

  // List all items in the 'images' directory
  storageRef.child('images/').listAll().then(function(result) {
    result.items.forEach(function(itemRef) {
      // Get the blob for each image
      itemRef.getBlob().then(function(blob) {
        const url = URL.createObjectURL(blob);

        const img = document.createElement('img');
        img.src = url;
        img.style.width = '300px'; // Adjust image size if needed
        document.body.appendChild(img);

        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = itemRef.name;
        downloadLink.textContent = 'Download';
        document.body.appendChild(downloadLink);
        document.body.appendChild(document.createElement('br')); // Add a line break

        // Revoke the URL object after the image has been loaded
        img.onload = function() {
          URL.revokeObjectURL(url);
        };
      }).catch(function(error) {
        // Handle errors
        console.error('Error fetching image blob:', error);
      });
    });
  }).catch(function(error) {
    // Handle errors
    console.error('Error listing images:', error);
  });
