# Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Extract the Project
Extract the `insurance-system.zip` to your desired location.

### Step 2: Install Backend Dependencies
```bash
cd insurance-system/backend
npm install
```

### Step 3: Start the Backend Server
```bash
npm start
```

You should see:
```
Insurance System API running on http://localhost:5000
Default Admin Credentials:
Username: admin
Password: admin123
```

### Step 4: Open Frontend in Browser
Open a new terminal and navigate to frontend folder:

**Option A: Simple Local Server (Recommended)**
```bash
cd insurance-system/frontend
python -m http.server 8000
```

Then open your browser and go to: `http://localhost:8000`

**Option B: Direct Open**
Simply open `insurance-system/frontend/index.html` directly in your browser.

### Step 5: Login
- **Username**: `admin`
- **Password**: `admin123`

That's it! You're ready to use the system.

---

## 📋 What You Can Do

After logging in, you can:

### Dashboard
- View overall statistics and metrics

### Customers
- ➕ Add new customers
- 📝 View customer list
- ✏️ Edit customer information
- 🗑️ Delete customers

### Policies
- ➕ Add insurance policies
- 📋 View all policies
- Manage different policy types: Auto, Health, Home, Travel

### Claims
- 📋 File new claims
- 📝 Review claims
- ✅ Approve/Reject claims
- 📌 Add adjuster notes

---

## 🔧 Troubleshooting

### Port Already in Use
If port 5000 is already in use, modify the PORT in `backend/server.js`:
```javascript
const PORT = 5001; // Change to different port
```

### CORS Error
Make sure backend is running on http://localhost:5000 before opening the frontend.

### Frontend Not Loading API Data
1. Check if backend server is running
2. Check browser console for errors (F12)
3. Verify API_URL in `frontend/index.html` matches your backend URL

### Node.js Not Found
Install Node.js from https://nodejs.org (LTS version recommended)

---

## 📝 Sample Data

The system comes with pre-loaded sample data:

**Customers:**
- Asha Raman
- Vikram Nair

**Policies:**
- Auto Insurance - ₹800,000
- Health Insurance - ₹500,000
- Home Insurance - ₹3,500,000

**Claims:**
- Sample pending and approved claims

---

## 🎓 Learning the System

### 1. Explore Dashboard
- See overall statistics

### 2. Add a New Customer
- Click "Customers" → "Add Customer"
- Fill in details and save

### 3. Create a Policy
- Click "Policies" → "Add Policy"
- Select customer and policy type
- Set coverage and dates

### 4. File a Claim
- Click "Claims" → "File a claim"
- Select active policy
- Enter claim details
- Submit

### 5. Review a Claim
- Click "Claims" → Review button
- Change status and add notes
- Save changes

---

## 🌐 Development Notes

### Backend (Node.js + Express)
- Location: `backend/server.js`
- RESTful API endpoints
- In-memory database (can be replaced)
- Session-based authentication

### Frontend (Vanilla JavaScript)
- Location: `frontend/index.html`
- Single Page Application (SPA)
- No build process needed
- CORS-enabled API calls

### Database
Currently uses in-memory storage. To persist data, replace with:
- MongoDB
- PostgreSQL
- MySQL
- SQLite

---

## 📞 Common Tasks

### Add New Admin User
Edit `backend/server.js` - database.users array:
```javascript
{
  id: 2,
  username: 'newadmin',
  email: 'admin2@shieldline.com',
  password: 'password123',
  role: 'admin'
}
```

### Change API Port
Edit `backend/server.js`:
```javascript
const PORT = 3000; // Your port
```

Then update `frontend/index.html`:
```javascript
const API_URL = 'http://localhost:3000/api';
```

### Add New Policy Type
Edit `frontend/index.html` policy type select:
```html
<option value="NewType">New Type</option>
```

---

## ✨ Tips

1. **Keyboard Shortcuts**: Use Tab to navigate forms faster
2. **Sample Data**: Use sample data to understand workflows
3. **Browser DevTools**: Press F12 to debug and view API calls
4. **API Testing**: Use Postman to test API endpoints
5. **Responsive Design**: Works on desktop browsers

---

## 📚 Next Steps

1. Read the main README.md for full documentation
2. Explore API endpoints in `backend/server.js`
3. Customize styling in `frontend/index.html` (CSS section)
4. Add database persistence for production use
5. Deploy to cloud (Heroku, AWS, etc.)

---

**Happy Insurance Managing! 🎉**
