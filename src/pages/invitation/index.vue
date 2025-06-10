<template>
  <div v-if="!checkingProfile" class="invitation-container">
    <div class="invitation-header">
      <h2>Lista de Convites</h2>
      <v-btn class="btn-create" to="/invitation/new">Novo Convite</v-btn>
    </div>

    <div class="invitation-table">
      <div class="table-header">
        <span>EMAIL</span>
        <span>PAPEL</span>
        <span>STATUS</span>
        <span>AÇÕES</span>
      </div>

      <div v-if="invitations.length === 0" class="table-row empty">
        Nenhum dado disponível
      </div>
      <div v-else>
        <div v-for="invite in invitations" :key="invite.id" class="table-row">
          <span>{{ invite.email }}</span>
          <span>{{ invite.role }}</span>

          <!-- Status estilizado -->
          <span>
            <v-chip
              class="status-chip"
              :color="invite.accepted ? 'green' : 'blue'"
              size="small"
              label
            >
              {{ invite.accepted ? 'Aceito' : 'Pendente' }}
            </v-chip>
          </span>

          <!-- Ações -->
          <span class="actions">
            <v-btn
              class="btn-action"
              color="primary"
              size="small"
              variant="flat"
              @click="editInvitation(invite.id)"
            >
              Editar
            </v-btn>
            <v-btn
              class="btn-action"
              color="grey"
              size="small"
              variant="flat"
              @click="resendInvitation(invite.id)"
            >
              Reenviar
            </v-btn>
            <v-btn
              class="btn-action"
              color="red"
              size="small"
              variant="flat"
              @click="deleteInvitation(invite.id)"
            >
              Excluir
            </v-btn>
          </span>
        </div>
      </div>
    </div>

    <v-snackbar
      v-model="showSnackbar"
      :color="snackbarColor"
      :timeout="snackbarTimeout"
      location="top center"
      rounded="lg"
    >
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

definePage({
  meta: {
    title: 'Convites - Rápida Quickstart',
  },
})

const auth = useAuthStore()
const router = useRouter()

const checkingProfile = ref(true)
const invitations = ref([])

const showSnackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('success')
const snackbarTimeout = 3000

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
      headers: { Authorization: `Bearer ${auth.token}` },
    })
    const data = await res.json()

    if (!data.person && !data.company) {
      router.replace('/profile/select')
      return
    }

    // Carregar lista de convites
    await loadInvitations()
  } catch (error) {
    console.error('Erro ao carregar perfil:', error)
  } finally {
    checkingProfile.value = false
  }
})

async function loadInvitations() {
  try {
    const res = await fetch('http://localhost:3000/invitations', {
      headers: { Authorization: `Bearer ${auth.token}` },
    })

    if (!res.ok) throw new Error('Erro ao carregar convites')

    const responseJson = await res.json()
    invitations.value = responseJson.data.map(invite => ({
      id: invite.id || invite._id,
      email: invite.email,
      role: invite.role,
      accepted: invite.accepted || false,
    }))
  } catch (error) {
    console.error('Erro ao carregar convites:', error)
    showSnackbarMessage('Erro ao carregar convites', 'error')
  }
}

function showSnackbarMessage(msg, color = 'success') {
  snackbarText.value = msg
  snackbarColor.value = color
  showSnackbar.value = true
}

function editInvitation(inviteId) {
  router.push(`/invitation/${inviteId}`)
}

async function resendInvitation(inviteId) {
  try {
    const res = await fetch(`http://localhost:3000/invitations/${inviteId}/resend`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${auth.token}` },
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.message || 'Erro ao reenviar convite')
    }

    showSnackbarMessage('Convite reenviado com sucesso!', 'success')
  } catch (error) {
    console.error('Erro ao reenviar convite:', error)
    showSnackbarMessage(error.message || 'Erro ao reenviar convite', 'error')
  }
}

async function deleteInvitation(inviteId) {
  const confirmed = window.confirm('Tem certeza que deseja excluir este convite?')
  if (!confirmed) return

  try {
    const res = await fetch(`http://localhost:3000/invitations/${inviteId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${auth.token}` },
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.message || 'Erro ao excluir convite')
    }

    // Remove o convite da lista
    invitations.value = invitations.value.filter(invite => invite.id !== inviteId)
    showSnackbarMessage('Convite excluído com sucesso!', 'success')
  } catch (error) {
    console.error('Erro ao excluir convite:', error)
    showSnackbarMessage(error.message || 'Erro ao excluir convite', 'error')
  }
}
</script>

<style scoped>
.invitation-container {
  max-width: 75rem;
  margin: 40px auto;
  color: #d1d5db;
}

.invitation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.invitation-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
}

.btn-create {
  background-color: rgb(37 99 235 / var(--tw-bg-opacity, 1)) !important;
  color: #ffffff !important;
  font-weight: 500;
  text-transform: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.85rem;
}

.invitation-table {
  border-radius: 8px;
  overflow: hidden;
  background-color: #111827;
  font-size: 0.9rem;
}

.table-header,
.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 12px 16px;
}

.table-header {
  background-color: #1f2937;
  font-weight: 500;
  color: #9ca3af;
}

.table-row {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.table-row.empty {
  text-align: center;
  color: #6b7280;
}

.table-row span {
  display: flex;
  align-items: center;
}

.status-chip {
  color: #ffffff;
  font-weight: 500;
}

.actions {
  display: flex;
  gap: 6px;
}

.btn-action {
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: none;
  border-radius: 4px;
}
</style>