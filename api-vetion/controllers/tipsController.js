const express = require("express");
const app = express();
const path = require('path');
const jwt = require('jsonwebtoken');
const { Firestore } = require("@google-cloud/firestore");

// Inisialisasi Firestore
const db = new Firestore({
  projectId: "", //input your gcp project id
  databaseId: "", //input your database tips id
});

// Membuat instance BulkWriter
const bulkWriter = db.bulkWriter();

// Fungsi untuk mendapatkan data sayur berdasarkan nama dengan menampilkan pemilihan, penyimpanan
const gettipsByName = async (req, res) => {
  const { name } = req.params;

  if (!name) {
    return res.status(400).json({
      status: "fail",
      message: "Name is required",
    });
  }

  const vegetSnapshot = await db
    .collection("vegetable")
    .where("name", "==", name)
    .get();

  if (vegetSnapshot.empty) {
    return res.status(404).json({
      status: "fail",
      message: "Vegetable not found",
    });
  }

  // Mengambil data yang diinginkan
  const vegeData = vegetSnapshot.docs[0].data();
  const selectedData = {
    name: vegeData.name,
    manfaat: vegeData.manfaat,
    pemilihan: vegeData.pemilihan,
    penyimpanan_jangka_pendek: vegeData.penyimpanan_jangka_pendek,
    penyimpanan_jangka_panjang: vegeData.penyimpanan_jangka_panjang,
  };

  return res.status(200).json({
    status: "success",
    data: selectedData,
  });
};

module.exports = {
  gettipsByName,
};
