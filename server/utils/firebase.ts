import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface UploadResult {
  downloadUrl: string;
  path: string;
}

export const uploadToFirebase = async (file: Buffer, path: string): Promise<UploadResult> => {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    
    return {
      downloadUrl,
      path: snapshot.ref.fullPath
    };
  } catch (error) {
    console.error('Error uploading to Firebase:', error);
    throw error;
  }
};