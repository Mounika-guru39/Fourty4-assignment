// backend/middleware/validation.js
exports.validateUser = (req, res, next) => {
  const { name, email, phone, company, address } = req.body;
  const errors = [];

  if (!name || name.trim() === '') {
    errors.push('Name is required');
  }

  if (!email || email.trim() === '') {
    errors.push('Email is required');
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.push('Email is invalid');
  }

  if (!phone || phone.trim() === '') {
    errors.push('Phone is required');
  }

  if (!company || !company.name || company.name.trim() === '') {
    errors.push('Company name is required');
  }

  if (!address) {
    errors.push('Address is required');
  } else {
    if (!address.street || address.street.trim() === '') {
      errors.push('Street is required');
    }
    if (!address.city || address.city.trim() === '') {
      errors.push('City is required');
    }
    if (!address.zipcode || address.zipcode.trim() === '') {
      errors.push('Zipcode is required');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};
