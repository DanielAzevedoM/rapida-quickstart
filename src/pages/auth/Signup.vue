<template>
  <v-container
    class="d-flex flex-column align-center justify-center text-center v-container-style" fluid>
    <!-- Snackbar -->
    <v-snackbar
        v-model="showSnackbar"
        :color="snackbarColor"
        :timeout="snackbarTimeout"
        location="top center"
        rounded="lg"
        class="custom-snackbar"
    >
        <div class="d-flex align-center justify-space-between" style="width: 100%;">
            <span>{{ snackbarText }}</span>
            <v-btn
            icon="mdi-close"
            @click="showSnackbar = false"
            size="small"
            variant="text"
            class="ml-4"
            />
        </div>
    </v-snackbar>

    <v-card class="register-card" elevation="2">
      <v-avatar size="60" class="mx-auto mt-3 mb-1">
        <v-img src="@/assets/logo.svg" />
      </v-avatar>

      <!-- FORMULÁRIO (default) -->
      <template v-if="!success">
        <v-card-title class="register-title font-weight-bold">
          Criar nova conta
        </v-card-title>
        <div class="register-subtitle mb-3">
          Digite seu email abaixo e enviaremos um link para completar seu cadastro.
        </div>
        <v-form @submit.prevent="handlesubmit">
          <div class="text-left mb-1 mt-2">
            <span class="email-label">Email <span style="color:#a77">*</span></span>
          </div>
          <v-text-field
              v-model="form.email"
              density="comfortable"
              placeholder="seu@email.com"
              class="register-input mb-2"
              hide-details
              type="email"
          />
          <v-btn class="register-btn" block color="#4f02ff" size="large" type="submit">
            Enviar Email de Cadastro
          </v-btn>
        </v-form>
        <div class="mt-4 mb-1" style="font-size: 0.99rem; color: #a3a3a3">
          Já tem uma conta?
          <a class="register-link" href="/auth/signin">Fazer login</a>
        </div>
      </template>

      <!-- SUCESSO (após submit) -->
      <template v-else>
        <v-card-title class="register-title font-weight-bold">
          Criar nova conta
        </v-card-title>
        <div class="register-success-message mt-8 mb-8" style="color: rgb(74 222 128 / var(--tw-text-opacity, 1))">
          Email enviado com sucesso!<br>
          Verifique sua caixa de entrada para continuar o cadastro.
        </div>
        <div class="mt-4 mb-1" style="font-size: 0.99rem; color: #a3a3a3">
          Já tem uma conta?
          <a class="register-link" href="/auth/signin">Fazer login</a>
        </div>
      </template>
    </v-card>
    <div class="pos-card">
        <p>© 2025 Rapida Quickstart. Todos os direitos reservados.</p>
    </div>
  </v-container>
</template>


<script setup>
import { reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'

definePage({
  meta: {
    title: 'Criar Conta - Rápida Quickstart',
  }
})

const showSnackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('error') 
const snackbarTimeout = 3500 
const auth = useAuthStore()

const success = ref(false)

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

const form = reactive({
  email: ''
})

async function handlesubmit() {
  if (!form.email || !form.email.includes('@')) {
    showError('Preencha um e-mail válido.')
    return
  }
  await auth.signup(form.email)
  if (!auth.error) {
    showSuccess('Email de registro enviado com sucesso! Verifique sua caixa de entrada.')
    success.value = true
    //form.email = ''
  } else {
    showError('Email já existe!')
  }
}
</script>

<style scoped>
.v-container-style {
  padding-top: 5rem;
  width: 100vw;
}
.register-card {
  padding: 36px 30px 30px 30px;
  height: 27.4rem;
  width: 28rem;
  min-width: 290px;
  border-radius: 1.1rem;
  background: #161b26;
  box-shadow: 0 4px 24px #0002;
}
.register-title {
  font-size: 1.4rem;
  color: #fff;
}
.register-subtitle {
  font-size: 1rem;
  color: #a3a3a3;
  margin-bottom: 0.6rem;
}
.email-label {
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
}
.register-input :deep(input) {
  background: #232333 !important;
  border-radius: 0.5rem !important;
  color: #fff !important;
}
.register-btn {
  background: #4f02ff !important;
  color: #fff !important;
  border-radius: 0.5rem !important;
  font-weight: 600;
  letter-spacing: 0.01em;
  text-transform: none;
}
.register-btn:hover {
  background: #3216c8 !important;
}
.register-link {
  color: #4f02ff;
  text-decoration: none;
  font-weight: 500;
  margin-left: 0.3rem;
  transition: color .15s;
}
.register-link:hover {
  color: #7b47fa;
  text-decoration: underline;
}
.pos-card {
    padding-top: 2rem;
}
.custom-snackbar {
  margin: 0 auto;
  font-size: 1.05rem;
  font-weight: 500;
}
</style>
