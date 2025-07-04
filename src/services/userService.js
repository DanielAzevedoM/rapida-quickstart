import { useAuthStore } from '@/stores/authStore'

export async function hasProfile() {
  const auth = useAuthStore()
  const res = await fetch('http://localhost:3000/users/has-profile', {
    headers: { Authorization: `Bearer ${auth.token}` }
  })
  if (!res.ok) throw new Error('Erro ao verificar perfil')
  return res.json()
}

export async function getPersonProfile(userId) {
  const auth = useAuthStore()
  const res = await fetch(`http://localhost:3000/person-profiles/user/${userId}`, {
    headers: { Authorization: `Bearer ${auth.token}` }
  })
  if (!res.ok) throw new Error('Erro ao buscar perfil de pessoa')
  return res.json()
}

export async function getUserData() {
  const auth = useAuthStore()
  const res = await fetch('http://localhost:3000/users/me', {
    headers: { Authorization: `Bearer ${auth.token}` }
  })
  if (!res.ok) throw new Error('Erro ao buscar dados do usuário')
  return res.json()
}

export async function restoreAccount() {
  const auth = useAuthStore()
  const res = await fetch('http://localhost:3000/users/restore', {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${auth.token}` }
  })
  if (!res.ok) throw new Error('Falha ao restaurar a conta')
  return res.json()
}
