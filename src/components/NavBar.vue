<template>
  <header class="custom-app-bar">
    <v-container class="d-flex justify-space-between align-center" fluid>
      <div class="d-flex align-center gap-2 logo-area">
        <v-img
          src="@/assets/logo.svg"
          width="36"
          height="36"
          class="logo-img"
        />
        <div class="app-bar-title">Rapida Quickstart</div>
      </div>

      <div class="btn-group-style">
        <!-- Enquanto carrega a checagem de profile, não mostra nada -->
        <template v-if="!checkingProfile">
          <template v-if="isAuthenticated && hasProfile">
            <v-btn
              variant="outlined"
              class="menu-btn"
              @click="drawer = !drawer"
            >
              <v-icon>mdi-menu</v-icon>
              <span class="ml-2 text-capitalize">Menu</span>
            </v-btn>
          </template>

          <template v-else-if="isAuthenticated && !hasProfile">
            <v-btn class="text-white text-none rounded-btn" @click="logoutAndRedirect">
              Sair
            </v-btn>
          </template>

          <template v-else>
            <v-btn class="text-white text-none rounded-btn" to="/">Início</v-btn>
            <v-btn class="text-white text-none rounded-btn" to="/auth/signup">Criar conta</v-btn>
            <v-btn class="text-white text-none rounded-btn" to="/auth/signin">Login</v-btn>
          </template>
        </template>
      </div>
    </v-container>
  </header>

  <v-navigation-drawer
    v-model="drawer"
    temporary
    left
    width="280"
    absolute
    scrim
    class="custom-drawer"
  >
    <div class="drawer-header d-flex align-center">
      <v-avatar color="blue" size="32" class="mr-2">
        <span class="white--text">{{ userInitial }}</span>
      </v-avatar>
      <span class="drawer-title">Menu</span>
      <v-spacer></v-spacer>
      <v-btn icon class="close-btn" @click="drawer = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>

    <v-divider class="divider"></v-divider>

    <v-list dense>
      <div
        v-for="(item, index) in items"
        :key="item.text"
        class="drawer-item"
        @click="navigateTo(item.route)"
      >
        <div class="drawer-content">
          <v-icon class="drawer-icon">{{ item.icon }}</v-icon>
          <span class="drawer-text">{{ item.text }}</span>
        </div>
        <div v-if="index === 3" class="white-divider my-2"></div>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const drawer = ref(false)
const auth = useAuthStore()
const router = useRouter()

const isAuthenticated = computed(() => !!auth.token)
const userInitial = computed(() => (auth.user?.email || 'R').charAt(0).toUpperCase())

const hasProfile = ref(false)
const checkingProfile = ref(true)

const items = [
  { text: 'Início', icon: 'mdi-home', route: '/' },
  { text: 'Dashboard', icon: 'mdi-view-dashboard', route: '/dashboard' },
  { text: 'Perfil Pessoa', icon: 'mdi-account', route: '/profile/person' }, // será atualizado abaixo
  { text: 'Convites', icon: 'mdi-email', route: '/invitation' },
  { text: 'Configurações', icon: 'mdi-cog', route: '/settings' },
  { text: 'Sair', icon: 'mdi-logout', route: '/logout' }
]

onMounted(async () => {
  if (auth.token) {
    try {
      const res = await fetch('http://localhost:3000/users/has-profile', {
        headers: { Authorization: `Bearer ${auth.token}` }
      })
      const data = await res.json()
      console.log('Verificação de profile:', data)

      hasProfile.value = data.person || data.company

      // 🚀 Se tem perfil de pessoa, busca o perfil para pegar o id e atualizar o botão
      if (data.person && auth.user?._id) {
        const resProfile = await fetch(`http://localhost:3000/person-profiles/user/${auth.user._id}`, {
          headers: { Authorization: `Bearer ${auth.token}` }
        })
        if (resProfile.ok) {
          const profile = await resProfile.json()
          // Atualiza a rota do botão Perfil Pessoa com o id correto
          const perfilItem = items.find(item => item.text === 'Perfil Pessoa')
          if (perfilItem && profile._id) {
            perfilItem.route = `/profile/person/${profile._id}`
          }
        } else {
          console.warn('Perfil de pessoa não encontrado')
        }
      }

      // 🚀 Atualiza auth.user para refletir no botão Menu se necessário
      if (hasProfile.value) {
        await auth.fetchUser()
      }
    } catch (error) {
      console.error('Erro ao checar profile:', error)
      hasProfile.value = false
    } finally {
      checkingProfile.value = false
    }
  } else {
    checkingProfile.value = false
  }
})

function navigateTo(route) {
  if (route === '/logout') {
    logoutAndRedirect()
  } else {
    router.push(route)
    drawer.value = false
  }
}

function logoutAndRedirect() {
  auth.logout()
  window.location.href = '/'
}
</script>

<style scoped>
.custom-app-bar {
  background-color: #1c2434;
  color: #fff;
  height: 64px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 0 12px;
}
.logo-area {
  gap: 10px;
}
.logo-img {
  margin-right: 8px;
}
.app-bar-title {
  font-size: 1.25rem;
  font-weight: 600;
}
.btn-group-style {
  display: flex;
  align-items: center;
  margin-right: 16px;
  gap: 2px;
}
.menu-btn {
  margin-left: 8px;
  color: #fff;
  text-transform: none;
  font-weight: 500;
  border-color: rgba(255, 255, 255, 0.6);
  min-height: 36px;
}
.rounded-btn {
  background-color: rgb(37 99 235 / var(--tw-bg-opacity, 1));
  text-transform: none;
  font-weight: 500;
}
.custom-drawer {
  background-color: #1c2434 !important;
  color: #ffffff !important;
}
.drawer-header {
  padding: 12px 16px;
}
.drawer-title {
  font-weight: 600;
  font-size: 1rem;
}
.close-btn {
  color: #ffffff !important;
}
.close-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.drawer-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
}
.drawer-content {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: flex-start;
  padding: 12px 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}
.drawer-content:hover {
  background-color: rgba(255, 255, 255, 0.05);
}
.drawer-icon {
  color: #ffffff !important;
  font-size: 22px;
}
.drawer-text {
  color: #ffffff !important;
  font-size: 1.05rem;
}
.divider {
  border-width: 1px;
  border-color: rgb(255, 255, 255) !important;
}
.white-divider {
  height: 1px;
  background-color: #ffffff;
  opacity: 1;
  margin: 2px 0;
}
</style>
