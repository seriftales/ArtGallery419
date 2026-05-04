import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [artworks, setArtworks] = useState([]); // Başlangıç her zaman boş dizi
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const fetchArtworks = async () => {
    try {
      const res = await axios.get(`${API_URL}/artworks`);
      // Gelen veri dizi mi kontrol et, değilse boş dizi ata
      setArtworks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Veri çekilemedi:", err);
      setArtworks([]); // Hata anında listeyi patlatma, boş tut
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🎨 ArtGallery419 Panel</h1>

      {/* 1. BÖLÜM: GİRİŞ VE KAYIT BUTONLARI (HER ZAMAN GÖRÜNÜR) */}
      <section style={{ border: '2px solid #333', padding: '15px', marginBottom: '20px' }}>
        {!token ? (
          <div>
            <h3>Sisteme Giriş Yap</h3>
            <input type="email" placeholder="E-posta" onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Şifre" onChange={e => setPassword(e.target.value)} />
            <button onClick={() => alert("Giriş denenecek...")}>Giriş Yap</button>
            <button onClick={() => alert("Kaydol sayfasına yönlendir...")}>Kaydol</button>
          </div>
        ) : (
          <div style={{ color: 'green', fontWeight: 'bold' }}>
            Hoş geldin! Oturumun açık. <button onClick={() => {localStorage.removeItem('token'); setToken('');}}>Çıkış Yap</button>
          </div>
        )}
      </section>

      <hr />

      {/* 2. BÖLÜM: ESER LİSTESİ (BURASI PATLASA BİLE YUKARISI KALIR) */}
      <section>
        <h2>Galerideki Eserler</h2>
        <button onClick={fetchArtworks} style={{ marginBottom: '10px' }}>Listeyi Yenile</button>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* GÜVENLİ RENDER: Sadece diziyse ve içi doluysa map yap */}
          {Array.isArray(artworks) && artworks.length > 0 ? (
            artworks.map((art) => (
              <div key={art.artwork_id || Math.random()} style={{ border: '1px solid #ccc', padding: '10px' }}>
                <strong>{art.title}</strong> - {art.price} TL
              </div>
            ))
          ) : (
            <p style={{ color: '#666', fontStyle: 'italic' }}>
              Şu an galeride sergilenecek eser bulunmuyor. (Veritabanı boş olabilir)
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;