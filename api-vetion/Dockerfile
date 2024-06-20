# Gunakan node image sebagai base
FROM node:14

# Buat direktori kerja di dalam container
WORKDIR /app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua file dari local ke working directory di dalam container
COPY . .

# Copy kredensial Google Cloud ke container


# Ekspos port aplikasi
EXPOSE 3000

# Jalankan aplikasi
CMD ["node", "server.js"]

