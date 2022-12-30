const express = require('express');
const router = express.Router();
const ExpressError = require("../expressError")

// import the database module
const db = require('../db');

// GET all /companies
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT code, name FROM companies');
    return res.json({companies: result.rows});
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
});

// GET by the /companies/[code]
router.get('/:code', async (req, res) => {
  try {
    const result = await db.query('SELECT code, name, description FROM companies WHERE code = $1', [req.params.code]);
    if (result.rowCount === 0) {
      return res.status(404).json({error: 'Company not found'});
    }
    return res.json({company: result.rows[0]});
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
});

// POST a company to the database /companies
router.post('/', async (req, res) => {
  try {
    const {name, description} = req.body;
    const code = slugify(name, { lower: true });
    const result = await db.query(
      'INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING code, name, description',
      [code, name, description]
    );
    return res.json({company: result.rows[0]});
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
});

// PUT an update on existing /companies/[code]
router.put('/:code', async (req, res) => {
  try {
    const {name, description} = req.body;
    const result = await db.query(
      'UPDATE companies SET name = $1, description = $2 WHERE code = $3 RETURNING code, name, description',
      [name, description, req.params.code]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({error: 'Company not found'});
    }
    return res.json({company: result.rows[0]});
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
});

// DELETE company /companies/[code]
router.delete('/:code', async (req, res) => {
  try {
    const result = await db.query('DELETE FROM companies WHERE code = $1', [req.params.code]);
    if (result.rowCount === 0) {
      return res.status(404).json({error: 'Company not found'});
    }
    return res.json({status: 'deleted'});
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
});

module.exports = router;

