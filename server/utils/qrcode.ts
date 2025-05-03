import QRCode from 'qrcode';
import { createCanvas, loadImage } from 'canvas';
import { uploadToFirebase } from './firebase';

interface QRCodeOptions {
  width?: number;
  color?: string;
  backgroundColor?: string;
  includeLogo?: boolean;
  logoUrl?: string;
}

export const generateQRCode = async (
  data: string,
  options: QRCodeOptions = {}
): Promise<string> => {
  const {
    width = 400,
    color = '#000000',
    backgroundColor = '#FFFFFF',
    includeLogo = true,
    logoUrl = 'https://example.com/logo.png'
  } = options;

  try {
    // Create QR code
    const canvas = createCanvas(width, width);
    const ctx = canvas.getContext('2d');

    // Generate QR code
    const qrCodeDataUrl = await QRCode.toDataURL(data, {
      width,
      margin: 1,
      color: {
        dark: color,
        light: backgroundColor,
      },
    });

    // Draw QR code on canvas
    const qrImage = await loadImage(qrCodeDataUrl);
    ctx.drawImage(qrImage, 0, 0, width, width);

    // Add logo if requested
    if (includeLogo) {
      const logo = await loadImage(logoUrl);
      const logoSize = width * 0.2;
      const logoX = (width - logoSize) / 2;
      const logoY = (width - logoSize) / 2;

      // Draw white background for logo
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(logoX, logoY, logoSize, logoSize);

      // Draw logo
      ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
    }

    // Convert canvas to buffer
    const buffer = canvas.toBuffer('image/png');

    // Upload to Firebase
    const path = `qrcodes/${Date.now()}.png`;
    const { downloadUrl } = await uploadToFirebase(buffer, path);

    return downloadUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};

export const generateQRCodePDF = async (
  locations: Array<{ id: string; title: string; qrCodeUrl: string }>,
  projectTitle: string
): Promise<string> => {
  try {
    // Implementation for PDF generation would go here
    // This would typically use a library like PDFKit to create a PDF
    // with QR codes and location information
    
    // For now, we'll throw an error as this is not implemented
    throw new Error('PDF generation not implemented');
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};