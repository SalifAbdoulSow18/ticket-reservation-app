<template>
  <footer class="signature-footer">
    <div class="signature-wave">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#667eea" fill-opacity="0.2" d="M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,181.3C672,181,768,203,864,224C960,245,1056,267,1152,250.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
    </div>
    
    <div class="signature-content">
      <div class="signature-card">
        <div class="signature-avatar">
          <span class="avatar-emoji">👨🏾‍💻</span>
        </div>
        <div class="signature-info">
          <h3 class="signature-name">Salif Abdoul Sow</h3>
          <p class="signature-title">Ingénieur DevOps / SRE | CI/CD Specialist</p>
          <div class="signature-social">
            <a href="https://github.com/salifabdoulsow18" target="_blank" class="social-link">
              <span class="social-icon">🐙</span> GitHub
            </a>
            <a href="https://www.linkedin.com/in/salif-abdoul-sow-0bb916192" target="_blank" class="social-link">
              <span class="social-icon">🔗</span> LinkedIn
            </a>
            <a href="mailto:abdoulsalifsow06@gmail.com" class="social-link">
              <span class="social-icon">📧</span> Email
            </a>
          </div>
        </div>
        <div class="signature-flag">
          <span class="flag-emoji">🇸🇳</span>
        </div>
      </div>
      <p class="signature-copyright">© 2026 • Fait avec ❤️ au Sénégal</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'SignatureFooter'
}
</script>

<style scoped>
.signature-footer {
  position: relative;
  width: 100%;
  margin-top: 4rem;
}

.signature-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  line-height: 0;
  z-index: 1;
}

.signature-content {
  position: relative;
  z-index: 2;
  padding: 2rem 1rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.signature-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.15);
  border: 1px solid rgba(102, 126, 234, 0.2);
  margin-bottom: 1rem;
}

.signature-avatar {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.signature-info {
  flex: 1;
}

.signature-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.25rem 0;
}

.signature-title {
  color: #667eea;
  font-weight: 500;
  margin: 0 0 0.75rem 0;
  font-size: 0.9rem;
}

.signature-social {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.social-link {
  color: #666;
  text-decoration: none;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: color 0.3s ease;
}

.social-link:hover {
  color: #667eea;
}

.social-icon {
  font-size: 1rem;
}

.signature-flag {
  font-size: 2rem;
  opacity: 0.5;
  transform: rotate(5deg);
}

.signature-copyright {
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin: 1rem 0 0;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}

@media (max-width: 768px) {
  .signature-card {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
  }
  
  .signature-social {
    justify-content: center;
  }
  
  .signature-flag {
    display: none;
  }
}
</style>