import {
  getAuth,
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "../index";

const provider = new GoogleAuthProvider();

const auth = getAuth();

const google = async () => {

	const response = await signInWithPopup(auth, provider)
	  .then((result) => {
	    return {
	    	success: true,
	    	result: result.user,
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

const googleWithDP = async (username, image) => {
	const response = await signInWithPopup(auth, provider)
	  .then((result) => {
	    uploadBytes(profilePic, image)
      .then(() => {
        getDownloadURL(profilePic)
          .then((url) => {
            updateProfile(auth.currentUser, {
              displayName: username,
              photoURL: url,
            })
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
          })
          .catch(err => {
            return {
              success: false,
              errorMessage: err.message,
            }
          });
      })
      .catch(err => {
        return {
          success: false,
          errorMessage: err.message,
        }
      });
  })
  .catch(err => {
    return {
      success: false,
      errorMessage: err.message,
    }
  });

  return response;
}

export {
	google,
	googleWithDP,
}