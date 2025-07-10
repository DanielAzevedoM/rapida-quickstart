import { useAuthStore } from "@/stores/authStore";

export async function createInvitation(form) {
    const auth = useAuthStore()
    const res = await fetch('http://localhost:3000/invitations', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${auth.token}`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
    })

    if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Erro ao enviar convite.')
    }
    return res.json()
}

export async function getInvite(id) {
    const auth = useAuthStore()
    const res = await fetch(`http://localhost:3000/invitations/${id}`, {
      headers: { Authorization: `Bearer ${auth.token}` },
    })
    if (!res.ok) throw new Error('Erro ao buscar convite')
    return res.json()
}

export async function updateInvite(method, url, form) {
    const auth = useAuthStore()
    const res = await fetch(url, {
      method,
      headers: {
        'Authorization': `Bearer ${auth.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.message || 'Erro ao salvar convite.')
    }

    return res.json();
}

export async function getInvitations() {
  const auth = useAuthStore()
  const res = await fetch('http://localhost:3000/invitations', {
      headers: { Authorization: `Bearer ${auth.token}` },
    })

    if (!res.ok) throw new Error('Erro ao carregar convites')
  
    return res.json()
}

export async function sendInvitation(inviteId) {
  const auth = useAuthStore()
  const res = await fetch(`http://localhost:3000/invitations/${inviteId}/resend`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${auth.token}` },
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.message || 'Erro ao reenviar convite')
    }

    return
}

export async function deleteInvite(inviteId) {
    const auth = useAuthStore()
    const res = await fetch(`http://localhost:3000/invitations/${inviteId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${auth.token}` },
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.message || 'Erro ao excluir convite')
    }

    return
}
