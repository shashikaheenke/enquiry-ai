import express from 'express';

import {
  extractEnquiry,
  getEnquiries,
  updateEnquiryStatus,
} from '../controllers/enquiryController.js';

const router = express.Router();

router.get('/', getEnquiries);

router.post('/extract', extractEnquiry);

router.patch('/:id/status', updateEnquiryStatus);

export default router;
