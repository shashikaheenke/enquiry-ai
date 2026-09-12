import express from 'express';
import cors from 'cors';
import enquiryRoutes from './routes/enquiryRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'AI Enquiry Extractor API is running',
  });
});

app.use('/api/enquiries', enquiryRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
