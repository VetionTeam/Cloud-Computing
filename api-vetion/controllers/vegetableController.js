const { Firestore } = require('@google-cloud/firestore');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const db = new Firestore({
    projectId: '', //input your gcp project id
    databaseId: '', //input your firestore database vegetable id
});

const bulkWriter = db.bulkWriter();

const getvegetableByName = async (req, res) => {
    const { name } = req.params;

    if (!name) {
        return res.status(400).json({
            status: 'fail',
            message: 'Name is required'
        });
    }

    try {
        const vegetSnapshot = await db.collection('vegetable').where('name', '==', name).get();

        if (vegetSnapshot.empty) {
            return res.status(404).json({
                status: 'fail',
                message: 'Vegetable not found'
            });
        }

        const vege = vegetSnapshot.docs[0].data();
        return res.status(200).json({
            status: 'success',
            data: vege
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });
    }
};

const addvegetable = async (req, res) => {
    const vegetables = req.body; // Menganggap req.body adalah array dari sayuran
  
    if (!Array.isArray(vegetables) || vegetables.length === 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'A list of vegetables is required'
      });
    }
  
    const invalidVegetables = vegetables.filter(veg => {
      const {
        name, nama_latin, deskripsi, kalori, karbohidrat, protein, lemak, serat, vitamin, mineral, manfaat,
        pemilihan, penyimpanan_jangka_pendek, penyimpanan_jangka_panjang, menus
      } = veg;
      return !name || !nama_latin || !deskripsi || !kalori || !karbohidrat || !protein || !lemak || !serat || !vitamin || !mineral || !manfaat || !pemilihan || !penyimpanan_jangka_pendek || !penyimpanan_jangka_panjang || !menus;
    });
  
    if (invalidVegetables.length > 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'All fields are required for each vegetable',
        invalidVegetables
      });
    }
  
    const newVegetables = vegetables.map(veg => ({
      ...veg,
      createdAt: new Date().toISOString()
    }));
  
    try {
      const existingNames = new Set();
      const checkPromises = newVegetables.map(async veg => {
        const vegetSnapshot = await db.collection('vegetable').where('name', '==', veg.name).get();
        if (!vegetSnapshot.empty) {
          existingNames.add(veg.name);
        }
      });
      
  
      await Promise.all(checkPromises);
  
      if (existingNames.size > 0) {
        return res.status(409).json({
          status: 'fail',
          message: 'Some vegetables already exist',
          existingNames: Array.from(existingNames)
        });
      }
  
      const addPromises = newVegetables.map(async veg => {
        const docRef = db.collection('vegetable').doc();
        bulkWriter.create(docRef, veg);
      });
  
      await Promise.all(addPromises);
      await bulkWriter.close();
  
      return res.status(201).json({
        status: 'success',
        message: 'Vegetables added successfully',
        data: newVegetables
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
      });
    }
  };
  



const updateVegetable = async (req, res) => {
    const { name } = req.params;
    const updateData = req.body;

    if (!name) {
        return res.status(400).json({
            status: 'fail',
            message: 'Name is required'
        });
    }

    try {
        const vegetSnapshot = await db.collection('vegetable').where('name', '==', name).get();

        if (vegetSnapshot.empty) {
            return res.status(404).json({
                status: 'fail',
                message: 'Vegetable not found'
            });
        }

        const docId = vegetSnapshot.docs[0].id;
        bulkWriter.update(db.collection('vegetable').doc(docId), updateData);

        return res.status(200).json({
            status: 'success',
            message: 'Vegetable updated successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });
    }
};

const deleteVegetable = async (req, res) => {
    const { name } = req.params;

    if (!name) {
        return res.status(400).json({
            status: 'fail',
            message: 'Name is required'
        });
    }

    try {
        const vegetSnapshot = await db.collection('vegetable').where('name', '==', name).get();

        if (vegetSnapshot.empty) {
            return res.status(404).json({
                status: 'fail',
                message: 'Vegetable not found'
            });
        }

        const docId = vegetSnapshot.docs[0].id;
        bulkWriter.delete(db.collection('vegetable').doc(docId));

        return res.status(200).json({
            status: 'success',
            message: 'Vegetable deleted successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });
    }
};

module.exports = {
    getvegetableByName,
    addvegetable,
    updateVegetable,
    deleteVegetable,
};
