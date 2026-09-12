import supabase from '../config/supabase.js';
import { extractEnquiryData } from '../services/aiService.js';

export async function extractEnquiry(req, res) {
  try {
    const { enquiry } = req.body;

    if (!enquiry || !enquiry.trim()) {
      return res.status(400).json({
        error: 'Enquiry is required',
      });
    }

    const extractedData = await extractEnquiryData(enquiry);

    const newEnquiry = {
      id: Date.now(),
      customer_name: extractedData.customerName,
      service: extractedData.service,
      postcode: extractedData.postcode,
      phone: extractedData.phone,
      preferred_date: extractedData.preferredDate,
      preferred_time: extractedData.preferredTime,
      category: extractedData.category,
      priority: extractedData.priority,
      status: extractedData.status || 'New',
      summary: extractedData.summary,
      original_enquiry: enquiry,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('enquiries')
      .insert(newEnquiry)
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.json({
      result: mapEnquiryToFrontend(data),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Failed to extract enquiry',
    });
  }
}

export async function getEnquiries(req, res) {
  try {
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', {
        ascending: false,
      });

    if (error) {
      throw error;
    }

    res.json(data.map(mapEnquiryToFrontend));
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Failed to load enquiries',
    });
  }
}

export async function updateEnquiryStatus(req, res) {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    const allowedStatuses = ['New', 'In Progress', 'Completed'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        error: 'Invalid status',
      });
    }

    const { data, error } = await supabase
      .from('enquiries')
      .update({
        status,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      return res.status(404).json({
        error: 'Enquiry not found',
      });
    }

    res.json({
      result: mapEnquiryToFrontend(data),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Failed to update enquiry status',
    });
  }
}

function mapEnquiryToFrontend(item) {
  return {
    id: item.id,

    customerName: item.customer_name,

    service: item.service,

    postcode: item.postcode,

    phone: item.phone,

    preferredDate: item.preferred_date,

    preferredTime: item.preferred_time,

    category: item.category,

    priority: item.priority,

    status: item.status,

    summary: item.summary,

    originalEnquiry: item.original_enquiry,

    createdAt: item.created_at,
  };
}
