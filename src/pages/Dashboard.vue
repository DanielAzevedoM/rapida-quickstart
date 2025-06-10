<template>
  <div class="d-flex flex-column justify-center dashboard-container">
    <!-- Snackbar para mostrar mensagens -->
    <v-snackbar
      v-model="snackbar.show"
      :timeout="3000"
      color="success"
      location="top center"
    >
      {{ snackbar.text }}
    </v-snackbar>

    <!-- Card de aviso de conta marcada para exclusão -->
    <v-card
      v-if="accountMarkedForDeletion"
      class="dashboard-card danger-card mb-4"
    >
      <v-card-title class="danger-title">
        Sua conta está marcada para exclusão
      </v-card-title>
      <v-card-text class="card-text">
        Sua conta será excluída permanentemente em 90 dias.<br />
        Desde já sua conta só pode ser vista por você. Todos os dados que são do seu domínio também serão excluídos em 90 dias.<br />
        Caso você restaure sua conta, seus dados também voltarão.<br />
        <strong>Data de exclusão:</strong> {{ deletionDate }}
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn
          class="restore-btn"
          @click="restoreAccount"
        >
          Restaurar minha conta
        </v-btn>
      </v-card-actions>
    </v-card>

    <h1 class="dashboard-title">Dashboard</h1>
    <p class="dashboard-subtitle">Olá, {{ profileName }}!</p>

    <v-container class="dashboard-cards" fluid>
      <v-row>
        <v-col cols="12" md="4">
          <v-card class="dashboard-card">
            <v-card-title class="card-title">Perfil</v-card-title>
            <v-card-text class="card-text">
              Gerencie suas informações pessoais e profissionais.
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="dashboard-card">
            <v-card-title class="card-title">Configurações</v-card-title>
            <v-card-text class="card-text">
              Ajuste as configurações da sua conta e preferências.
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="dashboard-card">
            <v-card-title class="card-title">Atividade</v-card-title>
            <v-card-text class="card-text">
              Visualize sua atividade recente na plataforma.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

definePage({
  meta: {
    title: 'Dashboard - Rápida Quickstart',
 
  },
})

const auth = useAuthStore()
const router = useRouter()

const profileName = ref('')
const accountMarkedForDeletion = ref(false)
const deletionDate = ref('')
const snackbar = ref({
  show: false,
  text: '',
})

onMounted(async () => {
  if (!auth.token) {
    router.replace('/auth/signin')
    return
  }

  try {
    // Verifica se há perfil de pessoa ou empresa
    const res = await fetch('http://localhost:3000/users/has-profile', {
      headers: { Authorization: `Bearer ${auth.token}` }
    })
    const data = await res.json()

    if (!data.person && !data.company) {
      window.location.href = '/profile/select'
      return
    }

    if (data.person) {
      const personRes = await fetch(`http://localhost:3000/person-profiles/user/${auth.user._id}`, {
        headers: { Authorization: `Bearer ${auth.token}` }
      })
      const personProfile = await personRes.json()
      profileName.value = personProfile.personName || auth.user.email
    } else {
      profileName.value = auth.user.email
    }

    // Verifica se a conta está marcada para exclusão
    const userRes = await fetch('http://localhost:3000/users/me', {
      headers: { Authorization: `Bearer ${auth.token}` }
    })
    const userData = await userRes.json()
    if (userData.deletedAt) {
      accountMarkedForDeletion.value = true
      deletionDate.value = new Date(userData.deletedAt).toLocaleDateString()
    }
  } catch (error) {
    console.error('Erro ao buscar perfil no dashboard:', error)
  }
})

async function restoreAccount() {
  try {
    const res = await fetch('http://localhost:3000/users/restore', {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${auth.token}` }
    })

    if (!res.ok) {
      throw new Error('Falha ao restaurar a conta')
    }

    accountMarkedForDeletion.value = false
    deletionDate.value = ''
    snackbar.value.text = 'Conta restaurada com sucesso!'
    snackbar.value.show = true
  } catch (error) {
    console.error('Erro ao restaurar conta:', error)
    snackbar.value.text = 'Erro ao restaurar a conta.'
    snackbar.value.show = true
  }
}
</script>

<style scoped>
.dashboard-container {
  margin: 3rem auto;
  width: 150vh;
  padding: 24px;
}
.dashboard-title {
  font-size: 2rem;
  font-weight: 600;
  margin-left: 15px;
  margin-bottom: 8px;
  color: #ffffff;
}
.dashboard-subtitle {
  margin-left: 15px;
  color: #b0b3b8;
  margin-bottom: 24px;
}
.dashboard-cards {
  margin-top: 16px;
}
.dashboard-card {
  width: 29rem;
  background-color: #1f2937 !important;
  color: #ffffff !important;
  border-radius: 8px;
  padding: 5px;
}
.danger-card {
  width: 90rem;
  border: 1px solid rgba(255, 0, 0, 0.2);
  background-color: #2d2d2d !important;
}
.danger-title {
  color: #ff4d4d;
}
.restore-btn {
  background-color: #facc15 !important; /* Fundo amarelo */
  color: #ffffff !important;           /* Texto branco */
  font-weight: 500;
  text-transform: none;                /* Letra normal */
}
.card-title {
  font-weight: 600;
  font-size: 1.1rem;
}
.card-text {
  color: #b0b3b8;
}
.v-card-actions.justify-center {
  justify-content: center !important;
}
</style>
