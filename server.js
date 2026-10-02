const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const session = require('express-session');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'insurance-secret-key',
  resave: false,
  saveUninitialized: true
}));

// In-memory database
let database = {
  users: [
    { id: 1, username: 'admin', email: 'admin@shieldline.com', password: 'admin123', role: 'admin' }
  ],
  customers: [
    {
      id: 'CUST-001',
      fullName: 'Asha Raman',
      email: 'asha.raman@email.com',
      phone: '9876543210',
      dateOfBirth: '1985-05-15',
      city: 'Chennai',
      address: '123 Green Street, Chennai',
      createdAt: new Date()
    },
    {
      id: 'CUST-002',
      fullName: 'Vikram Nair',
      email: 'vikram.nair@email.com',
      phone: '9876543211',
      dateOfBirth: '1990-08-22',
      city: 'Mumbai',
      address: '456 Blue Avenue, Mumbai',
      createdAt: new Date()
    }
  ],
  policies: [
    {
      id: 'POL-AUT-100001',
      customerId: 'CUST-001',
      customerName: 'Asha Raman',
      type: 'Auto',
      coverage: 800000,
      premium: 5000,
      startDate: '2023-01-01',
      endDate: '2024-12-31',
      status: 'Active'
    },
    {
      id: 'POL-HEA-100002',
      customerId: 'CUST-001',
      customerName: 'Asha Raman',
      type: 'Health',
      coverage: 500000,
      premium: 3000,
      startDate: '2023-06-01',
      endDate: '2024-05-31',
      status: 'Active'
    },
    {
      id: 'POL-HOM-100003',
      customerId: 'CUST-002',
      customerName: 'Vikram Nair',
      type: 'Home',
      coverage: 3500000,
      premium: 8000,
      startDate: '2023-03-01',
      endDate: '2025-02-28',
      status: 'Active'
    }
  ],
  claims: [
    {
      id: 'CLM-20001',
      policyId: 'POL-AUT-100001',
      customerId: 'CUST-001',
      incidentDate: '2024-06-15',
      claimAmount: 75000,
      description: 'Car accident on highway',
      status: 'Pending',
      adjustorNotes: '',
      createdAt: '2024-06-20'
    },
    {
      id: 'CLM-20002',
      policyId: 'POL-HEA-100002',
      customerId: 'CUST-001',
      incidentDate: '2024-07-02',
      claimAmount: 128000,
      description: 'Hospitalisation for appendectomy.',
      status: 'Approved',
      adjustorNotes: 'Approved. Medical bills verified.',
      createdAt: '2024-07-05'
    }
  ]
};

// Authentication Routes
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = database.users.find(u => u.username === username && u.password === password);
  
  if (user) {
    req.session.userId = user.id;
    res.json({ success: true, user: { id: user.id, username: user.username, role: user.role } });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

app.get('/api/user', (req, res) => {
  if (req.session.userId) {
    const user = database.users.find(u => u.id === req.session.userId);
    res.json(user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// Dashboard Route
app.get('/api/dashboard', (req, res) => {
  const stats = {
    totalCustomers: database.customers.length,
    totalPolicies: database.policies.length,
    totalClaims: database.claims.length,
    pendingClaims: database.claims.filter(c => c.status === 'Pending').length,
    approvedClaims: database.claims.filter(c => c.status === 'Approved').length,
    rejectedClaims: database.claims.filter(c => c.status === 'Rejected').length,
    totalCoverageAmount: database.policies.reduce((sum, p) => sum + p.coverage, 0),
    totalPremiumCollected: database.policies.reduce((sum, p) => sum + p.premium, 0)
  };
  res.json(stats);
});

// Customer Routes
app.get('/api/customers', (req, res) => {
  res.json(database.customers);
});

app.get('/api/customers/:id', (req, res) => {
  const customer = database.customers.find(c => c.id === req.params.id);
  if (customer) {
    res.json(customer);
  } else {
    res.status(404).json({ message: 'Customer not found' });
  }
});

app.post('/api/customers', (req, res) => {
  const { fullName, email, phone, dateOfBirth, city, address } = req.body;
  const newCustomer = {
    id: 'CUST-' + String(database.customers.length + 1).padStart(3, '0'),
    fullName,
    email,
    phone,
    dateOfBirth,
    city,
    address,
    createdAt: new Date()
  };
  database.customers.push(newCustomer);
  res.status(201).json(newCustomer);
});

app.put('/api/customers/:id', (req, res) => {
  const customer = database.customers.find(c => c.id === req.params.id);
  if (customer) {
    Object.assign(customer, req.body);
    res.json(customer);
  } else {
    res.status(404).json({ message: 'Customer not found' });
  }
});

app.delete('/api/customers/:id', (req, res) => {
  const index = database.customers.findIndex(c => c.id === req.params.id);
  if (index !== -1) {
    database.customers.splice(index, 1);
    res.json({ message: 'Customer deleted' });
  } else {
    res.status(404).json({ message: 'Customer not found' });
  }
});

// Policy Routes
app.get('/api/policies', (req, res) => {
  res.json(database.policies);
});

app.get('/api/policies/:id', (req, res) => {
  const policy = database.policies.find(p => p.id === req.params.id);
  if (policy) {
    res.json(policy);
  } else {
    res.status(404).json({ message: 'Policy not found' });
  }
});

app.get('/api/customer/:customerId/policies', (req, res) => {
  const policies = database.policies.filter(p => p.customerId === req.params.customerId);
  res.json(policies);
});

app.post('/api/policies', (req, res) => {
  const { customerId, type, coverage, premium, startDate, endDate } = req.body;
  const customer = database.customers.find(c => c.id === customerId);
  
  if (!customer) {
    return res.status(404).json({ message: 'Customer not found' });
  }

  const policyId = `POL-${type.substring(0, 3).toUpperCase()}-${100000 + database.policies.length}`;
  const newPolicy = {
    id: policyId,
    customerId,
    customerName: customer.fullName,
    type,
    coverage,
    premium,
    startDate,
    endDate,
    status: 'Active',
    createdAt: new Date()
  };
  database.policies.push(newPolicy);
  res.status(201).json(newPolicy);
});

app.put('/api/policies/:id', (req, res) => {
  const policy = database.policies.find(p => p.id === req.params.id);
  if (policy) {
    Object.assign(policy, req.body);
    res.json(policy);
  } else {
    res.status(404).json({ message: 'Policy not found' });
  }
});

// Claims Routes
app.get('/api/claims', (req, res) => {
  res.json(database.claims);
});

app.get('/api/claims/:id', (req, res) => {
  const claim = database.claims.find(c => c.id === req.params.id);
  if (claim) {
    res.json(claim);
  } else {
    res.status(404).json({ message: 'Claim not found' });
  }
});

app.get('/api/customer/:customerId/claims', (req, res) => {
  const claims = database.claims.filter(c => c.customerId === req.params.customerId);
  res.json(claims);
});

app.post('/api/claims', (req, res) => {
  const { policyId, incidentDate, claimAmount, description } = req.body;
  const policy = database.policies.find(p => p.id === policyId);
  
  if (!policy) {
    return res.status(404).json({ message: 'Policy not found' });
  }

  const newClaim = {
    id: `CLM-${20000 + database.claims.length}`,
    policyId,
    customerId: policy.customerId,
    incidentDate,
    claimAmount,
    description,
    status: 'Pending',
    adjustorNotes: '',
    createdAt: new Date().toISOString().split('T')[0]
  };
  database.claims.push(newClaim);
  res.status(201).json(newClaim);
});

app.put('/api/claims/:id', (req, res) => {
  const claim = database.claims.find(c => c.id === req.params.id);
  if (claim) {
    Object.assign(claim, req.body);
    res.json(claim);
  } else {
    res.status(404).json({ message: 'Claim not found' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Insurance System API running on http://localhost:${PORT}`);
  console.log(`\nDefault Admin Credentials:\nUsername: admin\nPassword: admin123`);
});
