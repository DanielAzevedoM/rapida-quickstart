<template>
  <v-container class="pre-footer-container" fluid>
    <v-row align="start" justify="start">
      <v-col cols="12" md="5" class="d-flex flex-column">
        <div class="d-flex align-center mb-2">
          <v-avatar>
            <v-img
          src="@/assets/logo.svg"
          width="32"
          height="32"
          class="mr-2"
        ></v-img>
          </v-avatar>
          <span class="pre-footer-title font-weight-bold">Rapida Quickstart</span>
        </div>
        <div class="pre-footer-desc">
          Plataforma de gerenciamento de perfis com controle de acesso e autenticação segura.
        </div>
      </v-col>
      <v-col cols="12" md="3" class="d-flex flex-column">
        <span class="footer-label">RECURSOS</span>
        <span class="footer-link">Dashboard</span>
        <span class="footer-link">Perfil Pessoa</span>
        <span class="footer-link">Perfil Empresa</span>
      </v-col>
      <v-col cols="12" md="3" class="d-flex flex-column">
        <span class="footer-label">LEGAL</span>
        <span class="footer-link">Política de Privacidade</span>
        <span class="footer-link">Termos de Serviço</span>
      </v-col>
    </v-row>
  </v-container>

  <v-footer>
    <v-container>
      <v-row>
        <v-col class="text-center text-white">
          © 2025 Rapida Quickstart™ All Rights Reserved.
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped>
.pre-footer-container {
  width: 130vh;
  padding-top: 5.2rem;
  padding-bottom: 2.2rem;
  color: #d1d5db;
  background: transparent;
  min-height: 110px;
  border: none;
  font-family: 'Inter', sans-serif;
}
.pre-footer-title {
  font-size: 1.6rem;
  color: #fff;
  margin-left: 0.5rem;
}
.pre-footer-desc {
  color: #9ca3af;
  margin-left: 2.1rem;
  font-size: 1.08rem;
}
.footer-label {
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  margin-top: 0.3rem;
  letter-spacing: 0.05em;
}
.footer-link {
  color: #a3a3a3;
  font-size: 1rem;
  margin-bottom: 0.2rem;
  margin-left: 0.12rem;
  cursor: pointer;
  transition: color .15s;
}
.footer-link:hover {
  text-decoration: underline;
}
.footer-avatar {
  color: #fff;
  font-weight: 600;
  font-size: 1.1rem;
}
@media (max-width: 900px) {
  .pre-footer-container {
    width: 100%;
    text-align: center;
    padding-top: 1.4rem;
    padding-bottom: 1.4rem;
  }
  .pre-footer-title {
    font-size: 1.3rem;
    margin-left: 0;
  }
  .pre-footer-desc {
    font-size: 0.95rem;
    margin-left: 0;
  }
  .footer-label {
    margin-top: 1rem;
  }
  .v-col.d-flex.flex-column {
    align-items: center;
  }
  .d-flex.align-center.mb-2 {
    justify-content: center; /* centraliza a linha com logo + nome */
  }
}


.v-footer {
  border-top: 1px solid #334155;
  background: transparent;
  box-shadow: none;
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
}
</style>
