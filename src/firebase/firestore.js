// firebase
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    addDoc,
    collection,
    db,
} from "./index";

const addDocument = async (collectionName, data) => {

    // response format
    let response = {
        success: false,
        message: "",
        data: null,
    }

    const colRef = collection(db, collectionName);

    try {
        const responseData = await addDoc(colRef, data);
        response = {
            ...response,
            success: true,
            data: responseData,
        }
    } catch(err) {
        response = {
            ...response,
            success: false,
            message: err,
        }
    }

    return response;
}

const addDocumentWithFileUpload = async (collectionName, data, file, fileName, fileKey) => {

    // response format
    let response = {
        success: false,
        err: null,
        data: null,
    }

    try {

        const storage = getStorage();
        const fileRef = ref(storage, fileName);
        
    
        await uploadBytes(fileRef, file);

        // Getting the image URL
        try {
            const url = await getDownloadURL(file);

            try {
                const responseData = await addDoc(collectionName, {
                    ...data,
                    [fileKey]: url,
                })

                response = {
                    ...response,
                    success: true,
                    data: responseData,
                }
            } catch(err) {
                response = {
                    ...response,
                    success: false,
                    err,
                }
            }

        } catch(err) {
            response = {
                ...response,
                success: false,
                err,
            }
        }

    }catch(err) {
        response = {
            ...response,
            success: false,
            err,
        }
    }

    return response;

}


export {
    addDocument,
    addDocumentWithFileUpload,
}