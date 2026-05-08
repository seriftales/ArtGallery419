# 🎨 ArtGallery419

Veritabanı Yönetimi dersi için geliştirilen "Online Sanat Galerisi ve Atölye Rezervasyon Sistemi" projesi. 

Bu proje bir **Monorepo**  yapısında kurgulanmıştır. Frontend ve Backend tamamen birbirinden izole edilmiş, kendi paket yönetimlerine sahip iki ayrı proje olarak aynı klasör altında yer alır.


---

## 📂 Proje Mimarisi 

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
│   └── .env                 # Gizli bilgiler 

```
🚀 Kurulum Talimatları
Projeyi yerel bilgisayarınızda ayağa kaldırmak için aşağıdaki adımları sırasıyla uygulayın.

Ön Koşullar
Bilgisayarınızda Node.js (v20 veya üzeri LTS) kurulu olmalıdır.

Bilgisayarınızda PostgreSQL kurulu ve çalışır durumda olmalıdır.

Cors ,Bcrypt,Express ve Mutter bağımlılıkları gerekebilir 



### Adım 1: Projeyi Klonlama

```text
git clone https://github.com/seriftales/ArtGallery419.git

cd ArtGallery419
```
### Adım 2: Backend Kurulumu ve Veritabanı

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
   PORT=5005
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=artgallery
   DB_PASSWORD=<Password>
   DB_PORT=<PORT>
```

Veritabanını Oluşturun:
init.sql ve seed.sql dosyalarını şu şekilde çalıştırarak kurabilirsiniz.Veritabanında artgallery adlı bir veritabanı oluşturmalısınız.Bunları ayrı bir terminalde yapın.

```text

sudo -u postgres psql -d artgallery -f init.sql
sudo -u postgres psql -d artgallery -f seed.sql

```

Ardından veritabanı terminaline bağlanıp SQL sorguları atmak isterseniz şu adımları uygulamanız gerekiyor:

```text
sudo -u postgres psql
\c artgallery

```

Sunucuyu Başlatın:

```text
npm run dev
```

*Terminalde `Server is running on port PORT` yazısını görmelisiniz.*

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
frontend klasörünün içine .env adında bir dosya oluşturun:Asagıdaki gibi bir ayarlaması olması gerekir.

```text
VITE_API_URL=http://localhost:5000/api
```
 **Arayüzü Başlatın:
```text
   bash
   npm run dev
```
   
 Terminalde çıkan linke tıklayarak siteye erişebilirsiniz.

 
NOT: "CORS ayarları http://localhost:3000 için yapılmıştır,kontrol sağlayın.
