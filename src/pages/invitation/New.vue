<template>
  <div v-if="!checkingProfile" class="new-invitation-container">
    <h1 class="new-invitation-title">Novo Convite</h1>
    <p class="new-invitation-subtitle">
      Preencha o formulário abaixo para criar um novo convite.
    </p>

    <v-container class="new-invitation-form" fluid>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            label="Email *"
            v-model="form.email"
            variant="outlined"
            hide-details
            dense
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-select
            label="Papel *"
            :items="roles"
            v-model="form.role"
            variant="outlined"
            hide-details
            dense
          ></v-select>
        </v-col>
      </v-row>

      <div class="btn-row">
        <v-btn
          color="primary"
          class="submit-btn"
          @click="enviar"
          :loading="loading"
        >
          Enviar
        </v-btn>
        <v-btn variant="tonal" class="cancel-btn" @click="cancelar">
          Cancelar
        </v-btn>
      </div>

      <v-snackbar
        v-model="showSnackbar"
        :color="snackbarColor"
        :timeout="snackbarTimeout"
        location="top center"
        rounded="lg"
        class="custom-snackbar"
      >
        {{ snackbarText }}
      </v-snackbar>
    </v-container>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

definePage({
  meta: {
    title: 'Criar Convite - Rápida Quickstart',
  },
})

const auth = useAuthStore()
const router = useRouter()

const checkingProfile = ref(true)
const loading = ref(false)

const showSnackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('error')
const snackbarTimeout = 3500

const form = reactive({
  email: '',
  role: '',
})

const roles = ['Admin', 'Editor', 'Visualizador']

onMounted(async () => {
  if (!auth.token) {
    router.replace('/auth/signin')
    return
  }

  if (!auth.user) {
    await auth.fetchUser()
  }

  try {
    // Checagem de perfil
    const res = await fetch('http://localhost:3000/users/has-profile', {
      headers: { Authorization: `Bearer ${auth.token}` }
    })
    const data = await res.json()
    console.log('Checagem de perfil:', data)

    if (!data.person && !data.company) {
      router.replace('/profile/select')
      return
    }
  } catch (error) {
    console.error('Erro ao checar perfil:', error)
  } finally {
    checkingProfile.value = false
  }
})

function showError(msg) {
  snackbarText.value = msg
  snackbarColor.value = 'error'
  showSnackbar.value = true
}

function showSuccess(msg) {
  snackbarText.value = msg
  snackbarColor.value = 'success'
  showSnackbar.value = true
}

function cancelar() {
  router.push('/invitation')
}

async function enviar() {
  if (!form.email.trim()) {
    showError('O email é obrigatório.')
    return
  }
  if (!form.role.trim()) {
    showError('O papel é obrigatório.')
    return
  }

  loading.value = true
  try {
    const res = await fetch('http://localhost:3000/invitations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${auth.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.message || 'Erro ao enviar convite.')
    }

    showSuccess('Convite enviado com sucesso!')
    setTimeout(() => {
      router.push('/invitation')
    }, 1000)
  } catch (err) {
    console.error('Erro ao enviar convite:', err)
    showError(err.message || 'Erro ao enviar convite.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.new-invitation-container {
  margin: 3rem auto;
  width: 75rem;
  color: #ffffff;
}

.new-invitation-title {
    margin-left: 1rem;
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 8px;
}

.new-invitation-subtitle {
    margin-left: 1rem;
    color: #b0b3b8;
    margin-bottom: 24px;
}

.new-invitation-form {
    margin-top: 16px;
}

.btn-row {
  display: flex;
  justify-content: flex-start;
  gap: 12px;
  margin-top: 24px;
}

.submit-btn {
  min-width: 120px;
  font-weight: 600;
  text-transform: none;
  border-radius: 0.5rem;
}

.cancel-btn {
  min-width: 120px;
  font-weight: 600;
  text-transform: none;
  border-radius: 0.5rem;
}

.custom-snackbar {
  font-size: 0.9rem;
}
</style>
