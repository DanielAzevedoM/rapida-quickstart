<template>
  <v-container class="d-flex flex-column align-center justify-center text-center v-container-style" fluid>
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
        <v-btn icon="mdi-close" @click="showSnackbar = false" size="small" variant="text" class="ml-4" />
      </div>
    </v-snackbar>

    <v-card class="login-card" elevation="2">
      <v-avatar size="60" class="mx-auto mt-3 mb-1">
        <v-img src="@/assets/logo.svg" />
      </v-avatar>
      <v-card-title class="login-title font-weight-bold">
        Complete seu cadastro
      </v-card-title>
      <div class="login-subtitle mb-3">Insira uma senha para completar o cadastro.</div>

      <v-form @submit.prevent="handleRegister">
        <v-text-field
          v-model="form.email"
          label="Email"
          variant="outlined"
          dense
          hide-details
          disabled
          class="login-input mb-2"
        />

        <v-text-field
          v-model="form.password"
          label="Senha *"
          :type="showPassword ? 'text' : 'password'"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
          variant="outlined"
          dense
          hide-details
          class="login-input mb-2"
        />

        <v-text-field
          v-model="form.confirmPassword"
          label="Confirmar Senha *"
          :type="showPassword ? 'text' : 'password'"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
          variant="outlined"
          dense
          hide-details
          class="login-input mb-2"
        />

        <v-btn
          class="login-btn mt-2"
          block
          color="#4f02ff"
          size="large"
          type="submit"
          :loading="loading"
        >
          Criar Conta
        </v-btn>
      </v-form>

      <div class="mt-4" style="font-size: 0.95rem; color: #a3a3a3">
        Já tem uma conta?
        <a class="login-link" href="/auth/signin">Fazer login</a>
      </div>
    </v-card>

    <div class="pos-card mt-4">
      <p>© 2025 Rapida Quickstart. Todos os direitos reservados.</p>
    </div>
  </v-container>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";

definePage({
  meta: {
    title: 'Completar Registro - Rápida Quickstart',
  },
})

const form = reactive({
  email: "",
  password: "",
  confirmPassword: "",
});
const showPassword = ref(false);
const loading = ref(false);
const showSnackbar = ref(false);
const snackbarText = ref("");
const snackbarColor = ref("error");
const snackbarTimeout = 3500;
const router = useRouter();
let token = "";

function showError(msg) {
  snackbarText.value = msg;
  snackbarColor.value = "error";
  showSnackbar.value = true;
}

function showSuccess(msg) {
  snackbarText.value = msg;
  snackbarColor.value = "success";
  showSnackbar.value = true;
}

onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  const emailParam = params.get("email");
  const tokenParam = params.get("token");

  if (!emailParam || !tokenParam) {
    showError("Link de registro inválido!");
    router.replace("/auth/register");
    return;
  }

  form.email = emailParam;
  token = tokenParam;
});

async function handleRegister() {
  if (!form.password || !form.confirmPassword) {
    showError("Preencha todos os campos!");
    return;
  }

  if (form.password.length < 8) {
    showError("A senha deve ter pelo menos 8 caracteres!");
    return;
  }

  if (form.password !== form.confirmPassword) {
    showError("As senhas não coincidem!");
    return;
  }

  loading.value = true;
  try {
    const response = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
        registerToken: token,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Erro ao completar cadastro.");
    }

    showSuccess("Conta criada com sucesso!");
    setTimeout(() => {
      router.push("/auth/signin");
    }, 1000);
  } catch (err) {
    console.error("Erro ao registrar:", err);
    showError(err.message || "Erro ao completar cadastro.");
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
/* Reaproveitando seus estilos do login */
.v-container-style {
  padding-top: 5rem;
  width: 100vw;
}
.login-card {
  padding: 36px 30px;
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
  text-transform: none;
}
.login-link {
  color: #4f02ff;
  text-decoration: none;
  font-weight: 500;
  margin-left: 0.3rem;
  transition: color 0.15s;
}
.login-link:hover {
  color: #7b47fa;
  text-decoration: underline;
}
.pos-card {
  padding-top: 2rem;
}
</style>
