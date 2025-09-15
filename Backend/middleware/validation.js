const validateUser = (req, res, next) => {
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
  
  if (!address || !address.street || address.street.trim() === '') {
    errors.push('Address street is required');
  }
  
  if (!address || !address.city || address.city.trim() === '') {
    errors.push('Address city is required');
  }
  
  if (!address || !address.zipcode || address.zipcode.trim() === '') {
    errors.push('Address zipcode is required');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  
  next();
};

module.exports = { validateUser };
