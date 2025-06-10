<template>
  <div v-if="!checkingProfile" class="profile-form-container">
    <h1>Editar Perfil de Pessoa</h1>
    <p class="subtitle">
      Edite as informações do seu perfil de pessoa. Os campos marcados com
      <span class="required">*</span> são obrigatórios.
    </p>

    <!-- Tabs -->
    <v-tabs v-model="activeTab" grow>
      <v-tab v-for="(tab, idx) in tabs" :key="idx">
        {{ tab.label }}
      </v-tab>
    </v-tabs>

    <div class="tab-content">
      <component :is="tabs[activeTab].component" v-model="form" />
    </div>

    <div class="btn-row">
      <v-btn class="cancel-btn" variant="tonal" @click="cancelar">
        Cancelar
      </v-btn>
      <v-btn class="save-btn" color="#4f02ff" @click="enviar" :loading="loading">
        Salvar Perfil
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
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeMount } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter, useRoute } from 'vue-router'
import AbaPrincipais from '@/components/formTabs/AbaPrincipais.vue'
import AbaDocumentos from '@/components/formTabs/AbaDocumentos.vue'
import AbaContatosRedes from '@/components/formTabs/AbaContatosRedes.vue'
import AbaEnderecos from '@/components/formTabs/AbaEnderecos.vue'
import AbaFormacao from '@/components/formTabs/AbaFormacao.vue'
import AbaBancarios from '@/components/formTabs/AbaBancarios.vue'
import { user } from '@/utils/personFormFields'

definePage({
  meta: {
    title: 'Editar Perfil de Pessoa - Rápida Quickstart',
  },
})

const activeTab = ref(0)
const loading = ref(false)
const checkingProfile = ref(true)

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const id = route.params.id

const showSnackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('error')
const snackbarTimeout = 3500

const form = reactive({ ...user })

const tabs = [
  { label: 'Dados Principais', component: AbaPrincipais },
  { label: 'Documentos', component: AbaDocumentos },
  { label: 'Contatos e Redes', component: AbaContatosRedes },
  { label: 'Endereços', component: AbaEnderecos },
  { label: 'Formação', component: AbaFormacao },
  { label: 'Dados Bancários', component: AbaBancarios },
]

onBeforeMount(() => {
  if (!auth.token) {
    router.replace('/signin')
  }
})

onMounted(async () => {
  if (!auth.user) {
    await auth.fetchUser()
  }
  await checkAndLoadProfile()
})

async function checkAndLoadProfile() {
  try {
    const res = await fetch(`http://localhost:3000/person-profiles/${id}`, {
      headers: { Authorization: `Bearer ${auth.token}` },
    })

    if (!res.ok) throw new Error('Erro ao buscar perfil')

    const profile = await res.json()

    // ✅ Ajusta as datas para YYYY-MM-DD
    if (profile.birthday) {
      profile.birthday = profile.birthday.split('T')[0]
    }
    if (profile.rgIssuanceDate) {
      profile.rgIssuanceDate = profile.rgIssuanceDate.split('T')[0]
    }
    if (profile.passportIssuanceDate) {
      profile.passportIssuanceDate = profile.passportIssuanceDate.split('T')[0]
    }
    if (profile.passportExpirationDate) {
      profile.passportExpirationDate = profile.passportExpirationDate.split('T')[0]
    }

    // ✅ Remove campos que não devem ser atualizados
    delete profile._id
    delete profile.createdAt
    delete profile.updatedAt
    delete profile.__v

    Object.assign(form, profile)
  } catch (error) {
    console.error('Erro ao carregar perfil:', error)
  } finally {
    checkingProfile.value = false
  }
}

function cancelar() {
  router.push('/dashboard')
}

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

function validarCamposObrigatorios() {
  if (!form.personName.trim()) return 'Nome completo é obrigatório.'
  if (!form.gender.trim()) return 'Gênero é obrigatório.'
  if (!form.birthday) return 'Data de nascimento é obrigatória.'
  if (form.tagId.length === 0) return 'Escolha pelo menos um interesse.'
  return ''
}

async function enviar() {
  const erro = validarCamposObrigatorios()
  if (erro) {
    showError(erro)
    return
  }

  if (!auth.user) {
    await auth.fetchUser()
  }

  loading.value = true
  try {
    const res = await fetch(`http://localhost:3000/person-profiles/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${auth.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.message || 'Erro ao salvar perfil')
    }

    showSuccess('Perfil atualizado com sucesso!')
    setTimeout(() => {
      window.location.href = '/dashboard'
    }, 1000)
  } catch (err) {
    showError(err.message || 'Erro ao salvar perfil')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.profile-form-container {
  max-width: 980px;
  margin: 40px auto 0 auto;
  background: none;
}
.subtitle {
  margin-bottom: 12px;
  color: #b6bcc6;
  font-size: 1.1rem;
}
.required {
  color: #c53;
}
.tab-content {
  margin-top: 24px;
}
.btn-row {
  display: flex;
  justify-content: flex-end;
  gap: 18px;
  margin-top: 30px;
}
.save-btn,
.cancel-btn {
  min-width: 120px;
  font-weight: 600;
  border-radius: 0.5rem !important;
  text-transform: none;
}
</style>
