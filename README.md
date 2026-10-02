# Shieldline - Multi-Line Insurance Policy and Claims Management System

A comprehensive web-based system for managing insurance policies and claims across multiple lines of business (Auto, Health, Home, Travel).

## Features

- **Dashboard** - Overview of all customers, policies, and claims statistics
- **Customer Management** - Add, view, edit, and delete customer information
- **Policy Management** - Create and manage insurance policies for different types
- **Claims Management** - File new claims, review, and update claim status
- **Multi-line Insurance** - Support for Auto, Health, Home, and Travel insurance
- **Claims Processing** - Track claims from submission to approval/rejection
- **Admin Control** - Claims adjuster interface for managing claims

## Project Structure

```
insurance-system/
├── backend/
│   ├── server.js          # Express.js server with API endpoints
│   └── package.json       # Node.js dependencies
└── frontend/
    ├── index.html         # Single page application
    └── package.json       # (Optional) if using build tools
```

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Database**: In-memory (can be replaced with MongoDB/PostgreSQL)
- **API**: RESTful API with CORS support

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The API server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Open `index.html` in a web browser or serve it using a local server:

Using Python (Python 3):
```bash
python -m http.server 8000
```

Using Node.js (with http-server):
```bash
npm install -g http-server
http-server
```

Then open `http://localhost:8000` in your browser

## Default Login Credentials

- **Username**: `admin`
- **Password**: `admin123`

## API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/user` - Get current user info

### Dashboard
- `GET /api/dashboard` - Get dashboard statistics

### Customers
- `GET /api/customers` - List all customers
- `GET /api/customers/:id` - Get customer details
- `POST /api/customers` - Create new customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Policies
- `GET /api/policies` - List all policies
- `GET /api/policies/:id` - Get policy details
- `GET /api/customer/:customerId/policies` - Get customer's policies
- `POST /api/policies` - Create new policy
- `PUT /api/policies/:id` - Update policy

### Claims
- `GET /api/claims` - List all claims
- `GET /api/claims/:id` - Get claim details
- `GET /api/customer/:customerId/claims` - Get customer's claims
- `POST /api/claims` - File new claim
- `PUT /api/claims/:id` - Update claim (status, notes)

## Features Overview

### Dashboard
- Quick overview of system statistics
- Total customers, policies, and claims count
- Pending, approved, and rejected claims count

### Customer Management
- Add new customers with personal information
- View all customers in a table format
- Edit customer details
- Delete customer records
- Track customer contact information and address

### Policy Management
- Create policies for customers
- Support for multiple policy types (Auto, Health, Home, Travel)
- Track coverage amounts and premiums
- View policy status (Active, Expired)
- Link policies to customers

### Claims Management
- File claims against active policies
- View all claims with status tracking
- Review and approve/reject claims
- Add adjuster notes to claims
- Track claim amount and incident date

## Sample Data

The system comes pre-loaded with sample data:

### Customers
- Asha Raman (CUST-001)
- Vikram Nair (CUST-002)

### Policies
- Auto Policy for Asha Raman (₹800,000 coverage)
- Health Policy for Asha Raman (₹500,000 coverage)
- Home Policy for Vikram Nair (₹3,500,000 coverage)

### Claims
- CLM-20001: Car accident claim (Pending)
- CLM-20002: Health claim for appendectomy (Approved)

## Usage Guide

### Adding a New Customer
1. Navigate to Customers section
2. Click "Add Customer"
3. Fill in customer details
4. Click "Save customer"

### Creating a Policy
1. Navigate to Policies section
2. Click "Add Policy"
3. Select customer and policy type
4. Enter coverage amount and premium
5. Set start and end dates
6. Click "Save policy"

### Filing a Claim
1. Navigate to Claims section
2. Click "File a claim"
3. Select an active policy
4. Enter incident date and claim amount
5. Describe what happened
6. Click "Submit claim"

### Reviewing a Claim
1. Navigate to Claims section
2. Click "Review" on a claim
3. Change status (Pending/Approved/Rejected)
4. Add adjuster notes if needed
5. Click "Save changes"

## Customization

### Adding Policy Types
Edit the policy type dropdown in `frontend/index.html`:
```html
<select id="policy-type" required>
    <option value="">Select type</option>
    <option value="Auto">Auto</option>
    <option value="Health">Health</option>
    <option value="Home">Home</option>
    <option value="Travel">Travel</option>
    <option value="YourType">Your Type</option>
</select>
```

### Connecting to a Database
Replace the in-memory database in `backend/server.js` with:
- MongoDB with Mongoose
- PostgreSQL with Sequelize or TypeORM
- MySQL with Sequelize
- Firebase Realtime Database

## Future Enhancements

- PDF report generation
- Email notifications for claims
- Policy renewal reminders
- Payment gateway integration
- Advanced search and filtering
- Dashboard charts and graphs
- Mobile app version
- Document upload for claims
- Audit trail and logging

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please refer to the API documentation or modify the code as needed for your specific requirements.

---

**Made with ❤️ for Insurance Management**
