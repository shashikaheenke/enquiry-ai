# EnquiryAI

EnquiryAI is a full-stack AI-powered enquiry management application that converts unstructured customer messages into structured business data.

The application uses AI to extract customer information, classify the type of enquiry, assess priority, generate a summary, and store the processed enquiry in a database for ongoing management.

## Live Demo

Frontend:  
https://enquiry-ai.vercel.app

Backend API:  
https://enquiry-ai-api.onrender.com

> The backend is hosted on Render's free tier, so the first request may take a short time if the service has been inactive.

## Features

- AI-powered customer enquiry extraction
- Structured AI responses using JSON Schema
- Customer name extraction
- Service identification
- Postcode extraction
- Phone number extraction
- Preferred date and time extraction
- Automatic enquiry categorisation
- AI-generated priority classification
- AI-generated enquiry summary
- Persistent enquiry storage using Supabase PostgreSQL
- Enquiry dashboard
- Status management:
  - New
  - In Progress
  - Completed
- Search by customer, service, category, or postcode
- Filter by priority and status
- Dashboard statistics
- Responsive desktop, tablet, and mobile UI
- Production frontend/backend deployment

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Lucide React

### Backend

- Node.js
- Express
- OpenAI API

### Database

- Supabase
- PostgreSQL

### Deployment

- Vercel — frontend
- Render — backend
- Supabase — hosted database

## Architecture

```text
Customer enquiry
       |
       v
React / Vercel
       |
       v
Vercel API proxy
       |
       v
Node.js / Express / Render
       |
       +--------------------+
       |                    |
       v                    v
OpenAI API             Supabase
       |               PostgreSQL
       v                    |
Structured AI data <--------+
       |
       v
React Dashboard
```

## AI Workflow

A customer can submit an enquiry such as:

```text
Hi, I'm Daniel Moore. My bathroom sink is blocked and water is
draining very slowly. I'm in EX1 3AB. Please call me on
07700999111. Tomorrow morning would be ideal.
```

The backend sends the enquiry to the OpenAI API using a strict structured-output schema.

The AI returns structured data such as:

```json
{
  "customerName": "Daniel Moore",
  "service": "Blocked bathroom sink",
  "postcode": "EX1 3AB",
  "phone": "07700999111",
  "preferredDate": "Tomorrow",
  "preferredTime": "Morning",
  "category": "Plumbing",
  "priority": "Medium",
  "status": "New",
  "summary": "Customer requires assistance with a blocked bathroom sink."
}
```

The result is stored in Supabase PostgreSQL and displayed in the enquiry management dashboard.

## Project Structure

```text
enquiry-ai/
│
├── backend/
│   ├── config/
│   │   ├── openai.js
│   │   └── supabase.js
│   ├── controllers/
│   │   └── enquiryController.js
│   ├── routes/
│   │   └── enquiryRoutes.js
│   ├── services/
│   │   └── aiService.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── index.css
│   ├── vercel.json
│   └── package.json
│
├── package.json
└── README.md
```

## Environment Variables

### Backend

Create a `.env` file in the project root:

```env
OPENAI_API_KEY=your_openai_api_key
SUPABASE_URL=your_supabase_project_url
SUPABASE_SECRET_KEY=your_supabase_secret_key
```

### Frontend

For local development:

```env
VITE_API_URL=http://localhost:3001
```

Production uses a Vercel rewrite to proxy API requests to the Render backend.

## Running Locally

Install backend dependencies:

```bash
npm install
```

Start the backend:

```bash
npm start
```

Then open another terminal and install frontend dependencies:

```bash
cd frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

Local frontend:

```text
http://localhost:5173
```

Local backend:

```text
http://localhost:3001
```

## What I Learned

This project demonstrates practical experience with:

- integrating an LLM API into a full-stack application
- OpenAI structured outputs
- React component architecture
- Node.js and Express REST APIs
- separating AI logic into a service layer
- Supabase PostgreSQL integration
- environment variable management
- frontend/backend deployment
- API proxying
- responsive SaaS-style UI design
- business workflow automation

## Future Improvements

Potential future improvements include:

- email inbox integration
- automatic enquiry ingestion
- customer reply drafting
- authentication
- multiple organisations
- role-based access
- notifications for high-priority enquiries
- analytics and reporting
- audit history
- configurable AI categorisation rules

## Author

Shashika Heenkende

Full-Stack / AI Automation Developer

React | Node.js | SQL | AI APIs | Business Automation
