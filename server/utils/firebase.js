const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');

const uploadToFirebase = async (file, path) => {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
  } catch (error) {
    console.error('Error uploading to Firebase:', error);
    throw error;
  }
};

module.exports = {
  uploadToFirebase
};