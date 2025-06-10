<template>
  <div v-if="!checkingProfile" class="settings-container">
    <h1 class="settings-title">Configurações da Conta</h1>
    <p class="settings-subtitle">
      Gerencie suas preferências e configurações de conta
    </p>

    <v-snackbar
      v-model="snackbar.show"
      :timeout="3000"
      color="success"
      location="top center"
    >
      {{ snackbar.text }}
    </v-snackbar>

    <div class="settings-cards">
      <!-- Card de Segurança da Conta -->
      <div class="settings-card">
        <h2 class="card-title">Segurança da Conta</h2>
        <div class="card-section">
          <h3 class="card-section-title">Alterar Senha</h3>
          <p class="card-description">
            Recomendamos alterar sua senha regularmente para maior segurança.
          </p>
          <v-btn
            color="primary"
            class="btn-action"
            @click="showChangePasswordModal = true"
          >
            Alterar senha
          </v-btn>
        </div>
        <hr class="card-divider" />
        <div class="card-section">
          <h3 class="card-section-title">Autenticação em Duas Etapas</h3>
          <p class="card-description">
            Adicione uma camada extra de segurança à sua conta.
          </p>
          <v-btn color="primary" class="btn-action" @click="setupTwoFactor">
            Configurar autenticação em duas etapas
          </v-btn>
        </div>
      </div>

      <!-- Card de Exclusão ou Restauração de Conta -->
      <div
        class="settings-card danger-card"
        v-if="!accountMarkedForDeletion"
      >
        <h2 class="card-title danger-title">Exclusão de Conta</h2>
        <p class="card-description">
          Cuidado! A exclusão da sua conta é permanente após o período de 90 dias.
        </p>
        <p class="card-description">
          Ao excluir sua conta, você perderá acesso a todos os seus dados após
          o período de recuperação de 90 dias. Durante este período, você poderá
          restaurar sua conta.
        </p>
        <v-btn
          color="red"
          class="btn-danger"
          @click="showDeleteAccountModal = true"
        >
          Excluir minha conta
        </v-btn>
      </div>

      <div
        class="settings-card danger-card"
        v-else
      >
        <h2 class="card-title danger-title">Sua conta está marcada para exclusão</h2>
        <p class="card-description">
          Sua conta será excluída permanentemente em 90 dias.<br />
          Desde já sua conta só pode ser vista por você. Todos os dados que são do seu domínio também serão excluídos em 90 dias, mas também desde não podem ser vistos por ninguém.<br />
          Caso você restaure sua conta, seus dados também voltarão.<br />
          <strong>Data de exclusão:</strong> {{ deletionDate }}
        </p>
        <div class="text-center mt-3">
          <v-btn
            class="restore-btn"
            @click="restoreAccount"
          >
            Restaurar minha conta
          </v-btn>
        </div>
      </div>
    </div>

    <!-- Modais -->
    <v-dialog v-model="showChangePasswordModal" max-width="500px">
      <v-card>
        <v-card-title class="text-h6">Alteração de Senha</v-card-title>
        <v-card-text>
          <v-text-field
            label="Senha Atual"
            v-model="passwordForm.current"
            type="password"
            dense
            outlined
            class="mb-2"
          />
          <v-text-field
            label="Nova Senha"
            v-model="passwordForm.new"
            type="password"
            dense
            outlined
            class="mb-2"
          />
          <v-text-field
            label="Confirmar Nova Senha"
            v-model="passwordForm.confirm"
            type="password"
            dense
            outlined
          />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="showChangePasswordModal = false">Cancelar</v-btn>
          <v-btn
            color="primary"
            @click="submitChangePassword"
            :loading="loading"
          >
            Alterar Senha
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showDeleteAccountModal" max-width="400px">
      <v-card>
        <v-card-title class="text-h6"
          >Confirmação de Exclusão de Conta</v-card-title
        >
        <v-card-text>
          <v-icon color="red" size="48" class="mb-2">mdi-alert</v-icon>
          <p class="mb-2">
            Tem certeza que deseja excluir sua conta? Esta ação é permanente.
          </p>
          <p class="text-caption text-grey">
            Sua conta será marcada para exclusão e será removida
            permanentemente após 90 dias.
          </p>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="showDeleteAccountModal = false">Cancelar</v-btn>
          <v-btn
            color="red"
            @click="confirmDeleteAccount"
            :loading="loading"
          >
            Sim, excluir minha conta
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

definePage({
  meta: {
    title: 'Configurações - Rápida Quickstart',
  },
})

const auth = useAuthStore()
const router = useRouter()

const checkingProfile = ref(true)
const loading = ref(false)

const showChangePasswordModal = ref(false)
const showDeleteAccountModal = ref(false)

const accountMarkedForDeletion = ref(false)
const deletionDate = ref('')
const snackbar = ref({
  show: false,
  text: '',
})

const passwordForm = reactive({
  current: '',
  new: '',
  confirm: '',
})

onMounted(async () => {
  if (!auth.token) {
    router.replace('/auth/signin')
    return
  }

  if (!auth.user) {
    await auth.fetchUser()
  }

  try {
    // Verifica se há perfil
    const res = await fetch('http://localhost:3000/users/has-profile', {
      headers: { Authorization: `Bearer ${auth.token}` }
    })
    const data = await res.json()
    if (!data.person && !data.company) {
      router.replace('/profile/select')
      return
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
    console.error('Erro ao buscar perfil:', error)
  } finally {
    checkingProfile.value = false
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

function setupTwoFactor() {
  console.log('Configurar 2FA')
}

async function submitChangePassword() {
  if (
    !passwordForm.current ||
    !passwordForm.new ||
    passwordForm.new !== passwordForm.confirm
  ) {
    alert('Verifique se todos os campos estão preenchidos e as senhas coincidem.')
    return
  }

  loading.value = true
  try {
    const res = await fetch('http://localhost:3000/users/change-password', {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${auth.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        oldPassword: passwordForm.current,
        newPassword: passwordForm.new
      })
    })

    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.message || 'Erro ao alterar senha.')
    }

    alert('Senha alterada com sucesso!')
    showChangePasswordModal.value = false
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

async function confirmDeleteAccount() {
  loading.value = true
  try {
    const res = await fetch('http://localhost:3000/users', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    })

    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.message || 'Erro ao excluir conta.')
    }

    snackbar.value.text = 'Conta marcada para exclusão. Você pode restaurá-la em até 90 dias.'
    snackbar.value.show = true
    window.location.href = '/settings'
  } catch (error) {
    snackbar.value.text = error.message || 'Erro ao excluir conta.'
    snackbar.value.show = true
  } finally {
    loading.value = false
  }
}
</script>


<style scoped>
.settings-container {
  max-width: 75rem;
  margin: 40px auto;
  color: #d1d5db;
}

.settings-title {
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #ffffff;
}

.settings-subtitle {
  color: #b0b3b8;
  margin-bottom: 24px;
}

.settings-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.settings-card {
  background-color: #111827;
  border-radius: 0.8rem;
  padding: 1.5rem;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05);
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #ffffff;
}

.card-section-title {
  font-size: 1rem;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 4px;
}

.card-description {
  font-size: 0.9rem;
  color: #9ca3af;
  margin-bottom: 0.5rem;
}

.btn-action {
  margin-top: 0.3rem;
  border-radius: 0.4rem;
  font-weight: 500;
  text-transform: none;
  font-size: 0.85rem;
}

.btn-danger {
  margin-top: 1rem;
  border-radius: 0.4rem;
  font-weight: 500;
  text-transform: none;
  font-size: 0.9rem;
}

.restore-btn {
  background-color: #facc15 !important; /* Fundo amarelo */
  color: #ffffff !important;           /* Texto branco */
  font-weight: 500;
  text-transform: none;
}

.card-divider {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin: 1rem 0;
}

.danger-card {
  border: 1px solid rgba(255, 0, 0, 0.2);
}

.danger-title {
  color: #ff4d4d;
}
</style>
