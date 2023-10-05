import {
  getAuth,
  createUserWithEmailAndPassword,
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  updateProfile,
} from "../index";

const auth = getAuth();

const EP = async (email, password) => {
  const response = await createUserWithEmailAndPassword(auth, email, password)
  .then((cred) => {
    return {
      success: true,
      result: cred.user,
    }
  })
  .catch(err => {
    return {
      success: false,
      errorMessage: err.message,
    }
  });

  return response;
}

const EPWithDP = async (email, password, username, image) => {
  
  const storage = getStorage();
  const profilePic = ref(storage, username);

  const request = await createUserWithEmailAndPassword(auth, email, password)
  .then(() => {
    const uploadBytesResponse = await uploadBytes(profilePic, image)
      .then(() => {
        const getDownloadURLResponse = await getDownloadURL(profilePic)
          .then((url) => {
            const updateProfileResponse = await updateProfile(auth.currentUser, {
              displayName: username,
              photoURL: url,
            })
              .then((cred) => {
                
              })
              .catch(err => {
                console.log(err.message, "error");
              });
          })
          .catch(err => {
            console.log(err.message, "error");
          });
      })
      .catch(err => {
        console.log(err.message, "error");
      });
  })
  .catch(err => {
    console.log(err.message, "error");
  });
  
}

export {
  EPWithDP,
  EP,
}