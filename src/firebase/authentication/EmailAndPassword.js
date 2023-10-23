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


const EmailAndPassword = async (email, password, username=null, image=null) => {

  // response format
  let response = {
    success: false,
    message: "",
    data: null,
  }

  // Ensuring necessary fields are filled
  if (!email || !password) {
    response = {
      ...response,
      success: false,
      message: "Please fill in all necessary fields",
    }

    return response;
  }

  
  // Creating user
  try {
    await createUserWithEmailAndPassword(auth, email, password)

    // Signing up without username or image
    if (!username && !image) {
      response = {
        success: true,
      }
      return response;
    }
    
    // Signing up with username and image;
    try {
      const storage = getStorage();
      const profilePic = ref(storage, username);
      
  
      await uploadBytes(profilePic, image);

      // Getting the image URL
      try {
        const url = await getDownloadURL(profilePic);

        // updating profile
        try {
          await updateProfile(auth.currentUser, {
            displayName: username,
            photoURL: url,
          });

          response = {
            ...response,
            success: true,
          }
          return response;
        } catch(err) {
          response.success = false;
          response.message = err.code;
          return response;
        }
        

      } catch (err) {
        response.success = false;
        response.message = err.code;
        return response;
      }


    } catch(err) {
      response.success = false;
      response.message = err.code;
      return response;
    }


  } catch(err) {
    response.success = false;

    if (err.code === "auth/email-already-in-use") {
      response.message = "User already exists";
    }
    else if (err.code === "auth/network-request-failed") {
      response.message = "Poor internet connection";
    }
    else if (err.code === "auth/weak-password") {
      response.message = "Weak Password. Please choose a stronger password";
    }
    else if (err.code === "auth/invalid-email") {
      response.message = "Invalid email";
    }
    else {
      response.message = err.code;
    }

    return response;
  }

}

export {
  EmailAndPassword,
}