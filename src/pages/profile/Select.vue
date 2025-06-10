<template>
  <div v-if="!checkingProfile" class="profile-select-wrapper">
    <div class="profile-center-content">
      <div class="header-area">
        <h1>Bem-vindo à Plataforma</h1>
        <p>
          Para continuar, você precisa criar pelo menos um perfil na plataforma. Escolha uma das opções abaixo:
        </p>
      </div>
      <div class="card-row">
        <v-card v-if="canCreatePerson" class="profile-card">
          <div class="card-content">
            <h2 class="card-title">Perfil de Pessoa</h2>
            <p class="card-desc">
              Crie um perfil pessoal com suas informações, contatos e documentos.
            </p>
            <v-btn
              class="profile-btn"
              color="#4f02ff"
              size="large"
              to="/profile/person/new"
            >
              Criar Perfil de Pessoa
            </v-btn>
          </div>
        </v-card>

        <v-card v-if="canCreateCompany" class="profile-card">
          <div class="card-content">
            <h2 class="card-title">Perfil de Empresa</h2>
            <p class="card-desc">
              Crie um perfil empresarial com informações da empresa, contatos e documentos.
            </p>
            <v-btn
              class="profile-btn"
              color="#4f02ff"
              size="large"
            >
              Criar Perfil de Empresa
            </v-btn>
          </div>
        </v-card>
      </div>
      <div class="divider" />
      <div class="info-text">
        Você precisa criar pelo menos um perfil para acessar as funcionalidades da plataforma.
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

definePage({
  meta: {
    title: 'Selecionar Perfil - Rápida Quickstart',
    requireAuth: true,
  }
})

const auth = useAuthStore()
const router = useRouter()

const canCreatePerson = ref(true)
const canCreateCompany = ref(true)
const checkingProfile = ref(true) // 🔥 Adiciona esse flag para controlar o carregamento

onMounted(async () => {
  if (!auth.token) {
    router.replace('/auth/signin')
    return
  }

  if (!auth.user) {
    await auth.fetchUser()
  }

  try {
    const res = await fetch('http://localhost:3000/users/has-profile', {
      headers: { Authorization: `Bearer ${auth.token}` }
    })
    const data = await res.json()
    console.log('Checagem de perfil:', data)

    if (data.person || data.company) {
      console.log('Perfil já existente. Redirecionando para dashboard.')
      router.replace('/dashboard')
      return
    }

    canCreatePerson.value = true
    canCreateCompany.value = true
  } catch (error) {
    console.error('Erro ao checar perfil:', error)
  } finally {
    checkingProfile.value = false // ✅ Só exibe o template depois disso
  }
})
</script>

<style scoped>
.profile-select-wrapper {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-center-content {
  max-width: 900px;
  width: 100%;
  margin: 60px auto 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch; 
}

.header-area {
  margin-bottom: 28px;
  width: 100%;
  text-align: left;
}

.header-area h1 {
  font-size: 2.6rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
}
.header-area p {
  color: #b6bcc6;
  font-size: 1.15rem;
  margin-top: 12px;
}

.card-row {
  display: flex;
  gap: 2.5rem;
  margin-bottom: 36px;
  justify-content: center;
  width: 100%;
}

.profile-card {
  background: #222835;
  border: 1px solid #3b4252;
  border-radius: 12px;
  min-width: 350px;
  max-width: 420px;
  width: 100%;
  padding: 36px 32px;
  box-shadow: 0 2px 12px #0003;
  display: flex;
  align-items: flex-start;
}

.card-content {
  width: 100%;
}

.card-title {
  color: #d6d8dd;
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 12px;
}
.card-desc {
  color: #a8aebb;
  font-size: 1rem;
  margin-bottom: 22px;
}
.profile-btn {
  background: #4f02ff !important;
  color: #fff !important;
  border-radius: 0.5rem !important;
  font-weight: 600;
  text-transform: none;
  font-size: 1.01rem;
}
.profile-btn:hover {
  background: #3216c8 !important;
}
.divider {
  border-bottom: 1px solid #373d4e;
  margin: 34px 0 14px 0;
  width: 100%;
}
.info-text {
  color: #b6bcc6;
  font-size: 1.08rem;
  width: 100%;
  text-align: left;
}

@media (max-width: 768px) {
  .profile-center-content {
    margin-top: 30px; /* Menor topo no mobile */
    padding: 0 1rem;
    align-items: center; /* Centraliza os cards no mobile */
  }

  .header-area {
    text-align: center;
  }

  .card-row {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
  }

  .profile-card {
    min-width: 80%;
    max-width: 90%;
    padding: 24px 20px;
  }

  .info-text {
    text-align: center;
  }
}
</style>
