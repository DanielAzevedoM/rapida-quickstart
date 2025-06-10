<template>  
  <!-- Bloco principal -->
  <v-container class="container-style d-flex flex-column align-center justify-center text-center">
    <div>
      <h1 class="text-h2 font-weight-bold mb-4">
        Gerenciamento de Perfis com Autenticação Segura
      </h1>
      <p class="subtitle">
        Uma plataforma completa para gerenciar perfis de pessoas e empresas, com autenticação multi-provider e controle de funções.
      </p>
      <div class="btn-div">
        <v-btn
          v-if="isLoggedIn"
          class="custom-btn"
          to="/dashboard"
        >
          Ir para o Dashboard
        </v-btn>
        <template v-else>
          <v-btn class="custom-btn" to="/auth/signin">Entrar na plataforma</v-btn>
          <v-btn class="custom-btn-outlined" variant="outlined" to="/auth/signup">Criar uma conta</v-btn>
        </template>
      </div> 
    </div>
  </v-container>

  <!-- Recursos -->
  <v-container class="recursos-container" fluid>
    <div class="recursos-wrapper">
      <!-- Cards de recursos -->
      <div class="recursos-col">
        <h2 class="recursos-title">
          Principais recursos da plataforma
        </h2>
        <div class="features-container">
          <v-card class="feature-card">
            <v-card-title class="feature-title">Autenticação Multi-provider</v-card-title>
            <v-card-text class="feature-text">Login seguro com Google, Apple e email/senha. Proteção com JWT.</v-card-text>
          </v-card>
          <v-card class="feature-card">
            <v-card-title class="feature-title">Perfis Flexíveis</v-card-title>
            <v-card-text class="feature-text">Crie e gerencie perfis de pessoas e empresas com informações detalhadas.</v-card-text>
          </v-card>
          <v-card class="feature-card">
            <v-card-title class="feature-title">Controle de Acesso</v-card-title>
            <v-card-text class="feature-text">Sistema de papéis (roles) para controle de permissões granular.</v-card-text>
          </v-card>
          <v-card class="feature-card">
            <v-card-title class="feature-title">Interface Moderna</v-card-title>
            <v-card-text class="feature-text">UI responsiva e acessível com tema claro/escuro.</v-card-text>
          </v-card>
        </div>
      </div>

      <!-- Avatar -->
      <div class="recursos-avatar">
        <v-avatar size="400" class="giant-avatar">
          <v-img src="@/assets/logo.svg"></v-img>
        </v-avatar>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'

definePage({
  meta: {
    title: 'Rápida Quickstart - Plataforma de gerenciamento de perfis'
  }
})

const auth = useAuthStore()
const isLoggedIn = !!auth.token
</script>

<style scoped>
/* Container principal */
.container-style {
  margin-top: 3%;
  max-width: 65%;
  padding: 2rem 1rem;
}

.subtitle {
  color: rgb(156 163 175);
  text-align: center;
  max-width: 850px;
  font-size: 1.1rem;
  margin: 1rem auto 0;
}

/* Botões */
.btn-div {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.custom-btn {
  background-color: rgb(37 99 235);
  color: #ffffff !important;
  width: 12rem;
  height: 3.2rem !important;
  font-size: 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-transform: none;
}

.custom-btn-outlined {
  color: #9ca3af !important;
  width: 10rem;
  height: 3.2rem !important;
  font-size: 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-transform: none;
}

/* Wrapper de recursos */
.recursos-container {
  margin-top: 4rem;
  padding: 2rem 1rem;
}

.recursos-wrapper {
  width: 90%;
  display: flex;
  gap: 4rem;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
}

.recursos-col {
  flex: 1;
  min-width: 300px;
  max-width: 600px;
  text-align: center;
}

.recursos-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1.5rem;
}

.features-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.feature-card {
  width: 22.3rem;
  background-color: #1f2937;
  border-radius: 0.6rem;
  padding: 1rem;
  border: 1px solid #334155;
  text-align: left;
}

.feature-title {
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.feature-text {
  color: #d1d5db;
  font-size: 0.9rem;
}

/* Avatar */
.recursos-avatar {
  margin-left: 5%;
  display: none; /* some no mobile */
}

.giant-avatar {
  width: 60%;
  margin-top: 2rem;
  font-size: 7rem;
  font-weight: 700;
}

/* Desktop: 2 colunas para os cards e avatar visível */
@media (min-width: 768px) {
  .features-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center !important;
  }

  .recursos-wrapper {
    flex-wrap: nowrap;
    align-items: flex-start;
  }

  .recursos-col {
    text-align: left;
  }

  .recursos-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    order: initial;
  }
}
</style>
