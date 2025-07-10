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

export async function getProfile(userId) {
  const auth = useAuthStore()
  const res = await fetch(`http://localhost:3000/person-profiles/${userId}`, {
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

export async function changePassword(passwordForm) {
  const auth = useAuthStore()
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
  return res.json()
}

export async function deleteAccount() {
  const auth = useAuthStore()
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
    return res.json()
}

export async function updateAccount(id, form) {
  const auth = useAuthStore()
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
    return res.json()
}

export async function createPersonProfile(form) {
  const auth = useAuthStore()
  const res = await fetch('http://localhost:3000/person-profiles', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${auth.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.message || 'Erro ao salvar perfil')
    }

    return res.json()
}
