<template>
  <v-container
    class="d-flex flex-column align-center justify-center text-center v-container-style"
    fluid
  >
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
    <v-card class="login-card" elevation="2">
      <v-avatar size="60" class="mx-auto mt-3 mb-1">
        <v-img src="@/assets/logo.svg" />
      </v-avatar>
      <v-card-title class="login-title font-weight-bold">
        Entrar na sua conta
      </v-card-title>
      <div class="login-subtitle mb-3">
        Faça login para acessar sua conta.
      </div>
      <v-form @submit.prevent="handleLogin">
        <div class="text-left mb-1 mt-2">
          <span class="form-label">Email <span style="color:#a77">*</span></span>
        </div>
        <v-text-field
          v-model="form.email"
          density="comfortable"
          placeholder="nome@empresa.com"
          class="login-input mb-2"
          hide-details
          type="email"
          :disabled="auth.loading"
        />

        <div class="text-left mb-1 mt-2">
          <span class="form-label">Senha <span style="color:#a77">*</span></span>
        </div>
        <v-text-field
          v-model="form.password"
          density="comfortable"
          placeholder="************"
          class="login-input mb-2"
          hide-details
          :type="showPassword ? 'text' : 'password'"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
          :disabled="auth.loading"
        />

        <div class="d-flex justify-space-between align-center mb-1 mt-1" style="font-size: 0.92rem;">
          <div>
            <v-checkbox
              v-model="form.remember"
              hide-details
              density="compact"
              class="remember-me"
              label="Lembrar de mim"
              color="#4f02ff"
            />
          </div>
          <div>
            <a href="#" class="login-link">Esqueceu sua senha?</a>
          </div>
        </div>

        <v-btn
          class="login-btn mt-1"
          block
          color="#4f02ff"
          size="large"
          type="submit"
          :loading="auth.loading"
        >
          Entrar
        </v-btn>
      </v-form>

      <div class="mt-4 mb-1" style="font-size: 0.99rem; color: #a3a3a3">
        Não tem uma conta?
        <a class="login-link" href="/register">Criar conta</a>
      </div>
      <div class="divider-or mb-2">
        <span>ou continue com</span>
      </div>
      <div class="d-flex gap-2 justify-center align-center">
        <v-btn class="social-btn" block variant="outlined">
          <v-icon left size="20" color="red">mdi-google</v-icon>
          Continuar com Google
        </v-btn>
        <v-btn class="social-btn" block variant="outlined">
          <v-icon left size="20" color="#bbb">mdi-apple</v-icon>
          Continuar com Apple
        </v-btn>
      </div>
    </v-card>
    <div class="pos-card">
      <p>© 2025 Rapida Quickstart. Todos os direitos reservados.</p>
    </div>
  </v-container>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router' 

definePage({
  meta: {
    title: 'Login - Rápida Quickstart',
  },
})

const showSnackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('error') 
const snackbarTimeout = 3500 

function showError(msg) {
  snackbarText.value = msg
  snackbarColor.value = 'error'
  showSnackbar.value = true
}

const form = reactive({
  email: '',
  password: '',
  remember: false,
})

const showPassword = ref(false)

const auth = useAuthStore()
const router = useRouter()

async function handleLogin() {
  if (!form.email || !form.password) {
    showError("Preencha todos os campos!")
    return
  }

  if (!form.email.includes('@')) {
    showError("Email inválido!")
    return
  }

  await auth.login(form.email, form.password)
  if (!auth.error) {
    window.location.href = '/dashboard'
  } else {
    showError("Usuário ou senha incorretos!")
  }
}
</script>


<style scoped>
.v-container-style {
  padding-top: 5rem; 
  width: 100vw;
}
.login-card {
  padding: 36px 30px 30px 30px;
  width: 28rem;
  min-width: 290px;
  border-radius: 1.1rem;
  background: #161b26;
  box-shadow: 0 4px 24px #0002;
}

.login-title {
  font-size: 1.4rem;
  color: #fff;
}
.login-subtitle {
  font-size: 1rem;
  color: #a3a3a3;
  margin-bottom: 0.6rem;
}

.form-label {
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
}

.login-input :deep(input) {
  background: #232333 !important;
  border-radius: 0.5rem !important;
  color: #fff !important;
}
.login-btn {
  background: #4f02ff !important;
  color: #fff !important;
  border-radius: 0.5rem !important;
  font-weight: 600;
  letter-spacing: 0.01em;
  text-transform: none;
}
.login-btn:hover {
  background: #3216c8 !important;
}
.login-link {
  color: #4f02ff;
  text-decoration: none;
  font-weight: 500;
  margin-left: 0.3rem;
  transition: color .15s;
}
.login-link:hover {
  color: #7b47fa;
  text-decoration: underline;
}
.remember-me :deep(.v-label) {
  color: #9ca3af !important;
  font-weight: 400;
  font-size: 0.99rem;
  margin-left: 0.2rem;
}
.divider-or {
  color: #a3a3a3;
  text-align: center;
  font-size: 0.97rem;
  margin: 1.1rem 0 0.7rem 0;
}
.social-btn {
  border-radius: 0.5rem !important;
  color: #fff !important;
  min-width: 170px;
  font-weight: 600;
  background: #232333 !important;
  border: 1px solid #292947 !important;
  text-transform: none;
  margin: 0 0.4rem;
}
.social-btn:hover {
  background: #282c38 !important;
}
.pos-card {
    padding-top: 2rem;
}
.gap-2 {
  gap: 1rem;
}
</style>
