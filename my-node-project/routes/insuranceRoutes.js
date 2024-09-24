const express = require('express');
const router = express.Router();
const { InsuranceCompany, InsuranceProduct, Op } = require('../models');

/**
 * Get Non-Life Insurance companies
 */
router.get('/non-life', async (req, res) => {
  try {
    const companies = await InsuranceCompany.findAll({
      include: [{
        model: InsuranceProduct,
        as: 'products',
        where: { type: 'Motor' }, // Adjust based on the product type
        attributes: ['id', 'type', 'company', 'premium', 'coverage', 'terms_conditions', 'created_at']
      }]
    });
    res.json(companies);
  } catch (error) {
    console.error('Error fetching non-life insurance companies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Get Life Insurance companies
 */
router.get('/life', async (req, res) => {
  try {
    const companies = await InsuranceCompany.findAll({
      include: [{
        model: InsuranceProduct,
        as: 'products',
        where: { type: 'Term' }, // Adjust based on the product type
        attributes: ['id', 'type', 'company', 'premium', 'coverage', 'terms_conditions', 'created_at']
      }]
    });
    res.json(companies);
  } catch (error) {
    console.error('Error fetching life insurance companies:', error);
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
      include: [{
        model: InsuranceProduct,
        as: 'products',
        where: {
          type: type,
          premium: { [Op.between]: premiumRange },
          coverage: { [Op.between]: coverageRange }
        },
        attributes: ['id', 'type', 'company', 'premium', 'coverage', 'terms_conditions', 'created_at']
      }]
    });
    res.json(companies);
  } catch (error) {
    console.error('Error comparing insurance products:', error);
    res.status(500).json({ error: 'Comparison failed' });
  }
});

module.exports = router;
