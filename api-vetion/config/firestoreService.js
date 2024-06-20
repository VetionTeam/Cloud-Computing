const { Firestore } = require('@google-cloud/firestore');
const path = require('path');
require('dotenv').config();

const firestore = new Firestore({
    projectId: '', //input your gcp project id
    keyFilename: path.join(__dirname, '..', process.env.GCP_KEY_FILE),
    databaseId: '' //input your database firestore id
});

const userCollection = firestore.collection(''); //input your database firestore collection

module.exports = {
    firestore,
    userCollection,
};
