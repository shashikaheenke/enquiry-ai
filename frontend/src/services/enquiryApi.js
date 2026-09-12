const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const API_URL = `${BASE_URL}/api/enquiries`;

export async function getEnquiries() {
  const response = await fetch(API_URL);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to load enquiries');
  }

  return data;
}

export async function extractEnquiry(enquiry) {
  const response = await fetch(`${API_URL}/extract`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      enquiry,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to extract enquiry');
  }

  return data.result;
}

export async function updateEnquiryStatus(id, status) {
  const response = await fetch(`${API_URL}/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to update status');
  }

  return data.result;
}
