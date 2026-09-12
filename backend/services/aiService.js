import openai from '../config/openai.js';

export async function extractEnquiryData(enquiry) {
  const response = await openai.responses.create({
    model: 'gpt-5-mini',

    input: `Analyse this customer enquiry and extract the important business information.

Also:
- Categorise the enquiry into a sensible service category.
- Set priority as High, Medium, or Low based on urgency.
- Set status to "New".
- Create a short one-sentence summary.
- If information is missing, return null.
- Do not invent customer details.

Enquiry:
${enquiry}`,

    text: {
      format: {
        type: 'json_schema',
        name: 'enquiry_extraction',
        schema: {
          type: 'object',
          properties: {
            customerName: { type: ['string', 'null'] },
            service: { type: ['string', 'null'] },
            postcode: { type: ['string', 'null'] },
            phone: { type: ['string', 'null'] },
            preferredDate: { type: ['string', 'null'] },
            preferredTime: { type: ['string', 'null'] },
            category: { type: ['string', 'null'] },
            priority: { type: ['string', 'null'] },
            status: { type: ['string', 'null'] },
            summary: { type: ['string', 'null'] },
          },
          required: [
            'customerName',
            'service',
            'postcode',
            'phone',
            'preferredDate',
            'preferredTime',
            'category',
            'priority',
            'status',
            'summary',
          ],
          additionalProperties: false,
        },
        strict: true,
      },
    },
  });

  return JSON.parse(response.output_text);
}
