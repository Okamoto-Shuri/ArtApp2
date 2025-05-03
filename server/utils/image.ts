import sharp from 'sharp';
import { uploadToFirebase } from './firebase';

export interface GridImage {
  url: string;
  position: {
    x: number;
    y: number;
  };
}

export const processAndSplitImage = async (
  imageBuffer: Buffer,
  projectId: string,
  gridSize: number
): Promise<GridImage[]> => {
  try {
    // Load image and get dimensions
    const image = sharp(imageBuffer);
    const metadata = await image.metadata();
    const { width = 0, height = 0 } = metadata;

    // Calculate grid dimensions
    const dimension = Math.sqrt(gridSize);
    const pieceWidth = Math.floor(width / dimension);
    const pieceHeight = Math.floor(height / dimension);

    const gridImages: GridImage[] = [];

    // Split image into grid pieces
    for (let y = 0; y < dimension; y++) {
      for (let x = 0; x < dimension; x++) {
        const piece = await image
          .extract({
            left: x * pieceWidth,
            top: y * pieceHeight,
            width: pieceWidth,
            height: pieceHeight,
          })
          .toBuffer();

        // Upload piece to Firebase
        const path = `projects/${projectId}/grid/${x}-${y}.jpg`;
        const { downloadUrl } = await uploadToFirebase(piece, path);

        gridImages.push({
          url: downloadUrl,
          position: { x, y },
        });
      }
    }

    return gridImages;
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
};

export const optimizeImage = async (
  imageBuffer: Buffer,
  maxWidth = 1200,
  quality = 80
): Promise<Buffer> => {
  try {
    const image = sharp(imageBuffer);
    const metadata = await image.metadata();
    const { width = 0 } = metadata;

    if (width > maxWidth) {
      return await image
        .resize(maxWidth, null, { fit: 'inside' })
        .jpeg({ quality })
        .toBuffer();
    }

    return await image.jpeg({ quality }).toBuffer();
  } catch (error) {
    console.error('Error optimizing image:', error);
    throw error;
  }
};