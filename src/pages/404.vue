<template>
  <div class="notfound-container">
    <h1>404 - Página não encontrada</h1>
    <p>A página que você está procurando não existe.</p>
    <router-link to="/" class="btn-home">Voltar para Início</router-link>
  </div>
</template>

<script setup>
definePage({
  path: '/:pathMatch(.*)*',
  meta: {
    title: '404 - Rápida Quickstart',
  },
})
</script>

<style scoped>
.notfound-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
  color: #fff;
}
.notfound-container h1 {
  font-size: 3rem;
  margin-bottom: 12px;
}
.notfound-container p {
  margin-bottom: 24px;
}
.btn-home {
  background-color: #2563eb;
  color: #fff;
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
}
</style>
