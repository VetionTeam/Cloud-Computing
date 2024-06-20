# VeTion Predict Backend API

## Overview
This project deploys a machine learning model using Flask, Docker, and Google Cloud Run. The model classifies images of vegetables into various quality categories. Additional data about the recognized vegetable is fetched from a Node.js API endpoint.

## Based URL
```bash
https://model-vetion-v2-m7d2r5xhua-et.a.run.app/
```

## Features
1. Prediction Endpoint: Accepts an image file via POST request and returns the predicted class and confidence score.
2. Additional Data Fetching: Retrieves extra information about the recognized vegetable from an external API.
3. Scalability: Deployed using Docker and Google Cloud Run for easy scaling and maintenance.

## Endpoints
- **URL**: /predict
- **Method**: POST

## Request
- **Headers**
  - `Content-Type: Multipart/form-data`
  - `file` (file): The image file of the vegetables.

## Example Request 
```bash
curl -X POST https://model-vetion-v2-m7d2r5xhua-et.a.run.app/predict -F "image.jpeg"
```

## Response
- **Content** :
  ```bash
   {
    "additional_data_vegetable": {
        "data": {
            "createdAt": "2024-06-19T09:49:29.756Z",
            "deskripsi": "Tomat merah adalah tumbuhan dari keluarga Solanaceae, tumbuhan asli Amerika Tengah dan Selatan, dari Meksiko sampai Peru. Bentuk tomat merah umumnya berbentuk bulat atau lonjong. Warna merah ini berasal dari pigmen likopen yang terkandung di dalamnya. Daging tomat merah berwarna merah cerah atau merah tua. Rasanya manis dan sedikit asam dan bisa langsung dimakan. Daging tomat mengandung banyak air dan biji.",
            "kalori": "25 kal /100 gram",
            "karbohidrat": "3,9gr /100 gram",
            "lemak": "0,2gr  /100 gram",
            "manfaat": "Tomat merah, si buah bulat berwarna cerah menyimpan segudang manfaat kesehatan. Mengandung Likopen yang mana antioksidan. Dapat membantu kesehatan jantung karena mengandung Likopen yang dapat membantu menurunkan kolesterol LDL (jahat), memberikan efek perlindungan pada lapisan dalam pembuluh darah dan dapat menurunkan risiko pembekuan darah. Dapat membantu pencegahan kanker termasuk kanker payudara, dapat menjaga kesehatan kulit",
            "menus": [
                {
                    "menu_url": "https://cookpad.com/id/resep/22592954-telur-orek-tomat",
                    "nama_menu": "Telur Orek Tomat"
                },
                {
                    "menu_url": "https://cookpad.com/id/resep/22615789-sop-oyong-tomat-telur-menu-simpel-satset",
                    "nama_menu": "Sup Oyong Tomat Telur"
                },
                {
                    "menu_url": "https://cookpad.com/id/resep/22669522-telor-ceplok-saos-kecap-tomat",
                    "nama_menu": "Telur Ceplok Saos Kecap Tomat"
                }
            ],
            "mineral": "Folat, Kalium, Zat besi, Magnesium, Kromium, Kolin, Seng, dan Fosfor",
            "nama_latin": "Solanum lycopersicum syn. Lycopersicum esculentum",
            "name": "Tomat Merah",
            "pemilihan": "Untuk menentukan pemilihan tomat merah yang bagus, pilih tomat dengan warna merah merata dan cerah, hindari tomat yang kusam atau memiliki bintik hitam karena warna merah yang cerah menandakan tomat matang sempurna. Pilih tomat dengan kulit halus, mulus, dan tidak berkerut, serta hindari tomat yang memar, berlubang, atau retak. Jika masih ada batangnya, pilih batang yang masih hijau dan menempel kuat pada tomat; batang yang kering atau terlepas menandakan tomat sudah tua. Pilih tomat dengan bentuk yang bulat atau lonjong simetris, hindari tomat yang bentuknya tidak teratur atau cacat.",
            "penyimpanan_jangka_panjang": [
                "1. Iris tomat: Iris tomat menjadi irisan tipis.",
                "2. Keringkan: Tempatkan di atas rak pengering atau dehidrator dan keringkan hingga benar-benar kering.",
                "3. Simpan: Simpan tomat kering dalam wadah kedap udara di tempat yang sejuk dan gelap."
            ],
            "penyimpanan_jangka_pendek": [
                "1. Simpan di kulkas: Bungkus tomat rapat dengan plastik atau wadah kedap udara, letakkan di rak paling bawah kulkas dan hindari area dekat pintu kulkas karena fluktuasi suhu dapat mempercepat layu.",
                "2. Cuci sebelum konsumsi: Mencuci tomat terlebih dahulu dapat mempercepat pembusukan."
            ],
            "protein": "0,9gr /100 gram",
            "serat": "1,2gr /100 gram",
            "vitamin": "Vitamin A, K, B1, B3, B5, B6, C"
        },
        "status": "success"
    },
    "confidence": 0.9713720679283142,
    "confidence_percentage": "97.14%",
    "predicted_class": "Tomat Merah Bagus"
   }
   ```

- **Error Response**
  - **Code** : 400 Bad Request
  - **Content** :
  ```bash
  {
   "confidence": 0.42690619826316833,
   "confidence_percentage": "42.69%",
  }
  ```

  ## Model Details
The API uses a TensorFlow Keras model (`.h5`) stored in the `model` directory.

## Vegetable Information
The API provides 10 dataset information about various vegetables, including:
- **Brokoli Hijau**
- **Daun Pepaya**
- **Daun Singkong Biji**
- **Daun Kelor**
- **Kembang Kol**
- **Kubis Hijau**
- **Paprika Merah**
- **Sawi sendok atau Pakcoy**
- **Tomat Merah**
- **Wortel Nantes**


## Running the API
To run the API, execute the following command:
```bash
python app.py
```

*Install package with command:*
```
pip install -r requirements.txt
```

## *Note:* 
With Python 3.10.12, you can run it on WSL (Windows Subsystem Linux)
```bash
python3 app.py
```
