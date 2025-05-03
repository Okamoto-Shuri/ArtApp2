import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middleware/auth';
import { generateQRCode, generateQRCodePDF } from '../utils/qrcode';
import { ApiError } from '../middleware/error';

const router = Router();

// Generate QR code for a location
router.post('/generate', authenticateToken, async (req: Request, res: Response) => {
  const { data, options } = req.body;

  try {
    if (!data) {
      throw ApiError.badRequest('QR code data is required');
    }

    const qrCodeUrl = await generateQRCode(data, options);
    res.json({ url: qrCodeUrl });
  } catch (error) {
    throw ApiError.badRequest('Failed to generate QR code');
  }
});

// Generate PDF with all QR codes for a project
router.get('/project/:projectId/pdf', authenticateToken, async (req: Request, res: Response) => {
  try {
    // Implementation for generating PDF with all QR codes
    // This would fetch all locations for the project and generate a PDF
    res.json({ message: 'PDF generation not implemented' });
  } catch (error) {
    throw ApiError.badRequest('Failed to generate PDF');
  }
});

export default router;