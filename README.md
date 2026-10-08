#  ArtGallery419

Veritabanı Yönetimi dersi için geliştirilen "Online Sanat Galerisi ve Atölye Rezervasyon Sistemi" projesi. 

Bu proje bir **Monorepo**  yapısında kurgulanmıştır. Frontend ve Backend tamamen birbirinden izole edilmiş, kendi paket yönetimlerine sahip iki ayrı proje olarak aynı klasör altında yer alır.


##  Kurulum Talimatları
Projeyi yerel bilgisayarınızda ayağa kaldırmak için aşağıdaki adımları sırasıyla uygulayın.

### Adım 1: Projeyi Klonlama

```bash
git clone https://github.com/seriftales/ArtGallery419.git

cd ArtGallery419
```

### Adım 2 : Bağımlılıklar
Bilgisayarınızda Node.js (v20 veya üzeri LTS) kurulu olmalıdır.

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

Bilgisayarınızda PostgreSQL kurulu ve çalışır durumda olmalıdır.
```bash
sudo apt update
sudo apt install -y postgresql postgresql-contrib

```
Cors ,Bcrypt,Express ve Multer bağımlılıkları gerekmektedir.Projenin kök dizininde kurulumları gerçekleştirin.

```bash
npm install express cors bcrypt multer
```

### Adım 3: Backend Kurulumu ve Veritabanı

Backend klasörüne girip gerekli modülleri indirin ve veritabanını ayağa kaldırın.

**1.Bağımlılıkları kurun:**

```bash
cd backend
npm install
```

**2.Veritabanını Oluşturun:**
Veritabanında artgallery adlı bir veritabanı oluşturmalısınız.

*! Bunlar birer örnektir şifreyi ve kullanıcı isimlerini güncelleyebilirsiniz.*

```bash
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres123';"
sudo -u postgres psql -c "CREATE DATABASE artgallery;"
```

**3.Çevresel Değişkenleri Ayarlayın (.env):** 

backend klasörünün içine .env adında bir dosya oluşturun ve içine kendi yerel PostgreSQL bilgilerinizi girin.

```bash
PORT=5005
DB_USER=postgres
DB_HOST=localhost
DB_NAME=artgallery
DB_PASSWORD=postgres123
DB_PORT=5432
```
**4.Şema ve Örnek Veri Dosyalarını Aktarın:**
init.sql ve seed.sql dosyalarını şu şekilde çalıştırarak kurabilirsiniz.
```bash
cd src/db/
sudo -u postgres psql -d artgallery -f init.sql
sudo -u postgres psql -d artgallery -f seed.sql

```

**5.Veritabanı Bağlantısı:**
Veritabanı terminaline bağlanıp SQL sorguları atmak isterseniz şu adımları uygulamanız gerekmektedir.

```bash
sudo -u postgres psql
\c artgallery

```
**6.Sunucuyu Başlatın:**

```text
npm run dev
```

*Terminalde `Server is running on port PORT` yazısını görmelisiniz.*

### Adım 4: Frontend Kurulumu
Backend çalışmaya devam ederken yeni bir terminal sekmesi açın ve frontend arayüzünü ayağa kaldırın.

**1.Bağımlılıkları kurun:**
```bash
   cd frontend
   npm install
```
**2.Çevresel Değişkenleri Ayarlayın (.env):**
frontend klasörünün içine .env adında bir dosya oluşturun:Asagıdaki gibi bir ayarlaması olması gerekir.

```bash
VITE_API_URL=http://localhost:5005/api
```
**3.Arayüzü Başlatın:**
```bash
   npm run dev
```
   
*Terminalde çıkan linke tıklayarak siteye erişebilirsiniz.*

*NOT: "CORS ayarları http://localhost:3000 için yapılmıştır,kontrol sağlayın.*


##  Proje Mimarisi 

```text
ArtGallery419/
├── frontend/                # Müşterinin göreceği yüz (React.js + Vite)
│   ├── src/
│   │   ├── components/      # UI Parçaları (Navbar, Footer vb.)
│   │   ├── pages/           # Sayfalar
│   │   └── App.jsx          # Ana Yönlendirme
│   ├── package.json
│   └── .env                 # Frontend API yolları
│
├── backend/                 # İş mantığı ve API (Node.js + Express)
│   ├── src/
│   │   ├── config/          # Veritabanı bağlantı ayarları (db.js)
│   │   ├── controllers/     # İstek/Yanıt yönetimi (req, res)
│   │   ├── routes/          # API endpointleri
│   │   ├── services/        # Saf SQL sorgularının atıldığı katman
│   │   └── db/              # init.sql 
│   ├── index.js             # Sunucu giriş noktası
│   ├── package.json
│   └── .env                 # Yapılandırma 

```
