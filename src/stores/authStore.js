// stores/auth.js ou stores/auth.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loading: false,
    isAuthenticated: false,
    error: null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    token: sessionStorage.getItem('access_token') || null,
  }),
  actions: {
    async signup(email) {
      this.loading = true
      this.error = null
      try {
        const res = await fetch('http://localhost:3000/auth/register-init', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        })
        if (!res.ok) throw new Error('Erro ao enviar e-mail')
      } catch (err) {
        this.error = err.message || 'Erro desconhecido'
      } finally {
        this.loading = false
      }
    },

    async login(email, password) {
      this.loading = true
      this.error = null
      try {
        const res = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        })
        if (!res.ok) {
          const errData = await res.json()
          throw new Error(errData.message || 'Erro ao logar')
        }

        const data = await res.json()
        this.token = data.access_token
        sessionStorage.setItem('access_token', data.access_token)

        // Após o login, busca o usuário completo
        await this.fetchUser()
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async fetchUser() {
      if (!this.token) return
      this.loading = true
      this.error = null
      try {
        const res = await fetch('http://localhost:3000/users/me', {
          headers: { 'Authorization': `Bearer ${this.token}` }
        })
        if (!res.ok) throw new Error('Erro ao buscar usuário')
        const data = await res.json()

        // No Svelte, o user sempre tem userId, email, availableRoles etc
        this.user = data
        this.isAuthenticated = true

        localStorage.setItem('user', JSON.stringify(data))
      } catch (err) {
        this.error = err.message || 'Erro ao buscar usuário'
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.token = null
      this.user = null
      this.isAuthenticated = false
      sessionStorage.removeItem('access_token')
      localStorage.removeItem('user')
    }
  }
})
