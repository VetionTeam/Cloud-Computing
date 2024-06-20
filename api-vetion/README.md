# VETION APP AUTHENTICATION AND GET DATA
This is a JavaScript project that utilizes Express.js as the backend framework and Firestore as the database. The project focuses on implementing authentication features, including user registration, login, and access token management. 

## Installation
To use this project, follow these installation steps:

1. Clone this repository using your favorite code editor.
2. Make sure you have npm installed on your computer.
3. Run the application using Node.js with the following command: `npm start` 
4. The server will start on port 3001 by default.

## Configuration

Ensure you have a Google Cloud project set up with Firestore enabled. Place the service account key JSON file in the appropriate location and update the `GCP_KEY_FILE` path in your `.env` file.

## Environment

```bash

#Firestore Configuration
ProjectID = {your GCP project id}
databaseId = {your database id}
collection = {your firestore collection name}

# JWT Token
TOKEN_KEY = {define your own token key}
REFRESH_TOKEN_KEY = {define how long the access token is valid}
```

# API Endpoints

`https://my-vetion-backend-m7d2r5xhua-et.a.run.app`

## Authentication

### Endpoints Register
- **URL**: /auth/register
- **Method**: POST

### Example Request 
```bash
{
  "username": "exampleUser",
  "email": "example@example.com",
  "password": "password123"
}
```

### Response 
- **Success**
```bash
{
  "message": "User registered successfully"
}
```
- **Already Exist**
```bash
{
  "message": "User already exists"
}
```
- **Error**
```bash
{
  "message": " Internal Server Error"
}
```

### Endpoints Login
- **URL**: /auth/login
- **Method**: POST

### Example Request 

```bash
{
  "email": "example@example.com",
  "password": "password123"
}
```

### Response

- **Success**
```bash
{
    "message": "Logged in Succesfully",
    "token": "jwt_access_token",
    "refreshToken": "jwt_refresh_token"
}
```

- **Not Found**
```bash
{
    "message": "User not found"
}
```

- **Incorrect Password**
```bash
{
    "message": "Invalid credentials"
}
```
- **Error**
```bash
{
    "message": " Internal Server Error"
}
```

### Endpoints Logout
- **URL**: /auth/logout
- **Method**: POST

### Request
- **Headers**
  - `Authorization: Bearer <token>`

### Response 
- **Success**
```bash
{
    "message": "Logout successful"
}
```

## VEGETABLES

### Get Vegetable by Name

- **URL**: /vegetables/:name
- **Method**: GET

### Request
- **Headers**
  - `Authorization: Bearer <token>`

### Response 

- **Success**
```bash
{
    "status": "success",
    "data": {
        "manfaat": "Daun singkong memiliki beragam manfaat kesehatan yang menarik. Daun singkong  mengandung senyawa fitokimia yang memiliki sifat antioksidan dan antiinflamasi, yang dapat membantu melawan radikal bebas dalam tubuh dan mengurangi risiko peradangan. Konsumsi daun singkong secara teratur juga dikaitkan dengan peningkatan sistem kekebalan tubuh, penurunan risiko penyakit jantung, dan menjaga kesehatan mata dan kulit. Selain itu, daun singkong juga dapat membantu meningkatkan pencernaan, mengurangi risiko sembelit, dan membantu mengontrol kadar gula darah.",
        "penyimpanan_jangka_pendek": [
            "1. Bungkus dengan kresek: Daun singkong tidak usah dicuci tetapi langsung masukan kedalam kresek (plastik) daun singkong.",
            "2. Bungkus: Bungkus kresek (plastik) kemudian plester atau bisa menggunakan alat lain agar udara tidak masuk.",
            "3. Simpan: Masukan dalam rak kulkas paling bawah."
        ],
        "penyimpanan_jangka_panjang": [
            "1. Rebus daun (opsional): Daun singkong yang sudah direbus perlu direndam dalam air dingin terlebih dahulu. Hal ini bertujuan untuk menghentikan proses pematangannya.",
            "2. Peras (jika merebus daun): Lalu peras daun singkong agar kandungan airnya berkurang dan kepal-kepal dan bagi menjadi beberapa bagian.",
            "3. Siapkan wadah: Jika merebus daun masukkan satu per satu kepalan daun singkong sebelumnya dan jika tidak merebus daun masukkan daun ke dalam plastik-keluarkan udara dalam plastik-ikat.",
            "4. Simpan pada freezer: Daun singkong yang sudah dimasukkan ke plastik, bisa diletakkan di freezer."
        ],
        "vitamin": "vitamin A, B1, B2, B3, C",
        "kalori": "31 kal /100 gram",
        "createdAt": "2024-06-19T09:46:01.870Z",
        "karbohidrat": "5,9gr /100 gram",
        "protein": "3,4gr /100 gram",
        "serat": "4,3gr /100 gram",
        "name": "Daun Singkong",
        "nama_latin": "Manihot esculanta crantz",
        "pemilihan": "Untuk menentukan pemilihan daun singkong yang bagus, jangan memilih daun yang masih muda (pucuk daun), pilihlah yang 3-4 tangkai ke bawah. Pilih daun yang berwarna hijau tua dan cerah, serta hindari daun yang terlalu tua atau yang sudah menguning. Pilih daun yang ukurannya cukup besar dan tidak terlalu kecil. Sentuh daun untuk memastikan teksturnya kaku dan tidak layu, hindari daun yang terlalu lembek atau layu. Hindari juga daun yang rusak, sobek, atau berlubang karena bisa menjadi tanda bahwa daun tersebut tidak segar atau telah terkena hama.",
        "deskripsi": "Daun singkong merupakan  tanaman asli Amerika Tengah dan Selatan. Tanaman singkong dikenal tahan terhadap kondisi tanah yang kurang subur dan cuaca yang kering, sehingga cocok untuk tumbuh di daerah tropis dan subtropis. Daun singkong memiliki rasa yang agak pahit dan tekstur yang cukup keras jika dimakan mentah. Daun singkong mengandung glikosida sianogenik, yang dapat menghasilkan sianida, Oleh karena itu, daun singkong tidak boleh dimakan mentah.",
        "mineral": "Kalium, Tembaga, Zat Besi, Seng",
        "menus": [
            {
                "nama_menu": "Sayur Daun Singkong Kuah Santan",
                "menu_url": "https://cookpad.com/id/resep/22607477-sayur-daun-singkong-kuah-santan"
            },
            {
                "nama_menu": "Gulai Daun Singkong",
                "menu_url": "https://cookpad.com/id/resep/22656120-gulai-daun-singkong"
            },
            {
                "nama_menu": "Oseng Daun Singkong Teri",
                "menu_url": "https://cookpad.com/id/resep/22553928-oseng-daun-singkong-teri"
            }
        ],
        "lemak": "0,5gr /100 gram"
    }
}
```

- **Not Found**
```bash
{
    "status": "fail",
    "message": "Vegetable not found"
}
```

- **Error**
```bash
{
    "message": " Internal Server Error"
}
```

### Get Data Tips

- **URL**: /tips/:name
- **Method**: GET

### Request
- **Headers**
  - `Authorization: Bearer <token>`

### Response 
- **Success**
```bash
{
    "status": "success",
    "data": {
        "name": "Brokoli Hijau",
        "manfaat": "Brokoli hijau dapat meningkatkan sistem kekebalan tubuh seperti mencegah kanker karena mengandung senyawa sulforafan, memelihara kesehatan jantung, kesehatan mata, kesehatan tulang dan gigi karena mengandung vitamin K, menurunkan berat badan, menjaga kesehatan pencernaan, meningkatkan kesehatan kulit",
        "pemilihan": "Untuk menentukan pemilihan brokoli yang bagus bisa dilihat dari kepala bunga padat berwarna hijau tua, batang kokoh, dan daun hijau serta hindari kepala bunga lembek, kuning, atau layu. Coba tekan batang bagian atas dengan ujung jari, karena yang masih segar umumnya punya bagian batang yang cenderung masih keras dan tidak lunak. Juga coba tekan pangkal batang, jika terasa lunak dan cenderung berair, bisa jadi indikator hampir busuk.",
        "penyimpanan_jangka_pendek": [
            "1. Simpan di kulkas: Brokoli segar utuh akan bertahan sekitar 5-7 hari di kulkas.",
            "2. Potong-Potong: Potong brokoli menjadi kuntum yang lebih kecil sebelum disimpan dapat mengurangi waktu penyimpanan menjadi 3-4 hari.",
            "3. Bungkus dengan plastik: Pastikan brokoli dibungkus rapat dengan plastik kedap udara untuk mencegah kelembapan berlebih dan terkontaminasi oleh bau makanan lain di kulkas.",
            "4. Jauhkan dari etilena: Etilena adalah gas yang dikeluarkan oleh beberapa buah dan sayuran yang dapat mempercepat pembusukan brokoli (Jauhkan brokoli dari buah-buahan seperti apel,pisang, dan melon)."
        ],
        "penyimpanan_jangka_panjang": [
            "1. Blanching: Blanching adalah metode dengan merebus brokoli dalam air mendidih selama 1-2 menit kemudian rendam ke dalam air es selama 3 menit.",
            "2. Bekukan: Brokoli yang sudah diblanching kemudian dikeringkan dan dibekukan, Brokoli beku dapat bertahan hingga 12 bulan.",
            "3. Pengeringan: Brokoli dapat dikeringkan dengan oven atau dehidrator, Brokoli kering dapat disimpan pada wadah kedap udara di tempat yang sejuk dan gelap hingga 1 tahun."
        ]
    }
}
```

- **Not Found**
```bash
{
    "status": "fail",
    "message": "Vegetable not found"
}
```

- **Error**
```bash
{
    "message": " Internal Server Error"
}
```

### Get Data Facts

- **URL**: /tips/:name
- **Method**: GET

### Request
- **Headers**
  - `Authorization: Bearer <token>`

### Response 
- **Success**
```bash
{
    "status": "success",
    "data": {
        "fakta_unix": [
            "Cuci dengan air mengalir yang agak lama untuk menghilangkan pestisida dan sebelum dicuci harus dipotong potong terlebih dahulu"
        ],
        "judul_fakta": "Brokoli Hijau"
    }
}
```
- **Not Found**
```bash
{
    "status": "fail",
    "message": "Fact not found"
}
```
- **Error**
```bash
{
    "message": " Internal Server Error"
}
```

## Error Handling

The application uses middleware to handle errors and return appropriate responses. Common error statuses include:

- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error