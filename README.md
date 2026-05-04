# 🎨 ArtGallery419

Veritabanı Yönetimi dersi için geliştirilen "Online Sanat Galerisi ve Atölye Rezervasyon Sistemi" projesi. 

Bu proje bir **Monorepo** (Tek Depo) yapısında kurgulanmıştır. Frontend ve Backend tamamen birbirinden izole edilmiş, kendi paket yönetimlerine sahip iki ayrı proje olarak aynı klasör altında yaşamaktadır.


---

## 📂 Proje Mimarisi (Monorepo İskeleti)

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
│   │   └── db/              # init.sql (Tabloları oluşturan script)
│   ├── index.js             # Sunucu giriş noktası
│   ├── package.json
│   └── .env                 # Gizli bilgiler (Şifreler, Portlar)

```
🚀 Kurulum Talimatları
Projeyi yerel bilgisayarınızda (localhost) ayağa kaldırmak için aşağıdaki adımları sırasıyla uygulayın.

Ön Koşullar
Bilgisayarınızda Node.js (v20 veya üzeri LTS) kurulu olmalıdır.

Bilgisayarınızda PostgreSQL kurulu ve çalışır durumda olmalıdır.

Adım 1: Projeyi Klonlama

```text
git clone https://github.com/seriftales/ArtGallery419.git

cd ArtGallery419
```
Adım 2: Backend Kurulumu ve Veritabanı

Backend klasörüne girip gerekli modülleri indirin ve veritabanını ayağa kaldırın.


Bağımlılıkları kurun:

```text
cd backend
npm install
```

**Çevresel Değişkenleri Ayarlayın (.env):**
   `backend` klasörünün içine `.env` adında bir dosya oluşturun ve içine kendi yerel PostgreSQL bilgilerinizi girin:
``` text 
   env
   PORT=5000
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=artgallery
   DB_PASSWORD=senin_kendi_sifren
   DB_PORT=5432
```

Veritabanını Oluşturun:
PgAdmin veya psql terminalini kullanarak artgallery adında boş bir veritabanı oluşturun.

Ardından backend/src/db/init.sql dosyasının içindeki tüm SQL kodlarını kopyalayıp bu veritabanında çalıştırarak tabloları oluşturun

Sunucuyu Başlatın:

```text
npm run dev
```

*Terminalde `Server is running on port 5000` yazısını görmelisiniz.*

---

### Adım 3: Frontend Kurulumu
Backend çalışmaya devam ederken yeni bir terminal sekmesi açın ve frontend arayüzünü ayağa kaldırın.

 **Bağımlılıkları kurun:**
```text
   bash
   cd frontend
   npm install
```
  Çevresel Değişkenleri Ayarlayın (.env):
frontend klasörünün içine .env adında bir dosya oluşturun:

```text
VITE_API_URL=http://localhost:5000/api
```
 **Arayüzü Başlatın:
```text
   bash
   npm run dev
```
   
 Terminalde çıkan http://localhost:5173/ linkine tıklayarak siteye erişebilirsiniz.
 
 Backend çalıştırmak için de backend dizini altına gidin ve npm run dev komutunu çalıştırın.
 
 NOT : KENDI BRANCHLARINIZI OLUŞTURUN VE PULL REQUEST ATIN 

