const express = require('express');
const router = express.Router();
const { InsuranceCompany, InsuranceProduct, Op } = require('../models'); // Ensure Op is imported

/**
 * Get Non-Life Insurance companies
 */
router.get('/non-life', async (req, res) => {
  try {
    const companies = await InsuranceCompany.findAll({
      where: { type: 'Non-Life' },
      include: [{ model: InsuranceProduct, as: 'products' }]
    });
    res.json(companies);
  } catch (error) {
    console.error('Error fetching non-life insurance companies:', error); // Added logging
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Get Life Insurance companies
 */
router.get('/life', async (req, res) => {
  try {
    const companies = await InsuranceCompany.findAll({
      where: { type: 'Life' },
      include: [{ model: InsuranceProduct, as: 'products' }]
    });
    res.json(companies);
  } catch (error) {
    console.error('Error fetching life insurance companies:', error); // Added logging
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Compare Insurance Products (filter by premium, coverage)
 */
router.post('/compare', async (req, res) => {
  const { type, premiumRange, coverageRange } = req.body;

  try {
    const companies = await InsuranceCompany.findAll({
      where: { type },
      include: [{
        model: InsuranceProduct,
        as: 'products',
        where: {
          premium: { [Op.between]: premiumRange },
          coverage: { [Op.between]: coverageRange }
        }
      }]
    });
    res.json(companies);
  } catch (error) {
    console.error('Error comparing insurance products:', error); // Added logging
    res.status(500).json({ error: 'Comparison failed' });
  }
});

module.exports = router;

