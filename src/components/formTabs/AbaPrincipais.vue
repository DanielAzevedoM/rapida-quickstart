<template>
  <v-row dense>
    <v-col cols="12" md="6">
      <v-text-field label="Nome Completo *" v-model="modelValue.personName" required />
    </v-col>
    <v-col cols="12" md="6">
      <v-text-field label="Como gosta de ser chamado" v-model="modelValue.personNickname" />
    </v-col>
    <v-col cols="12" md="6">
      <v-select label="Gênero *" :items="generos" v-model="modelValue.gender" required />
    </v-col>
    <v-col cols="12" md="6">
      <v-text-field label="Data de Nascimento *" v-model="modelValue.birthday" type="date" required />
    </v-col>
    <v-col cols="12" md="6">
      <v-select label="Estado Civil" :items="estadosCivis" v-model="modelValue.maritalStatus" />
    </v-col>
    <v-col cols="12" md="6">
      <v-text-field label="Nome da Mãe" v-model="modelValue.motherName" />
    </v-col>
    <v-col cols="12" md="6">
      <v-text-field label="Nome do Pai" v-model="modelValue.fatherName" />
    </v-col>
    <v-col cols="12">
      <v-textarea label="Sobre Você" v-model="modelValue.personDescription" />
    </v-col>
    <v-col cols="12">
      <span>Tags / Interesses *</span>
      <div class="chip-row">
        <v-chip
          v-for="tag in tags"
          :key="tag"
          :color="modelValue.tagId.includes(tag) ? 'primary' : 'grey-darken-2'"
          @click="toggleTag(tag)"
          class="ma-1"
          variant="elevated"
        >
          {{ tag }}
        </v-chip>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
const props = defineProps(['modelValue'])

const generos = [
  { title: 'Masculino', value: 'M' },
  { title: 'Feminino', value: 'F' },
  { title: 'Neutro', value: 'N' },
  { title: 'Outro', value: 'O' },
]
const estadosCivis = [
  { title: 'Solteiro', value: 'single' },
  { title: 'Casado', value: 'married' },
  { title: 'Divorciado', value: 'divorced' },
  { title: 'Viúvo', value: 'widowed' },
  { title: 'Noivo', value: 'engaged' },
  { title: 'União Estável', value: 'commonLawMarried' },
]
const tags = ['Profissional', 'Estudante', 'Empreendedor', 'Designer', 'Desenvolvedor']

function toggleTag(tag) {
  const idx = props.modelValue.tagId.indexOf(tag)
  if (idx >= 0) props.modelValue.tagId.splice(idx, 1)
  else props.modelValue.tagId.push(tag)
}
</script>

<style scoped>
.chip-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 6px;
  margin-bottom: 8px;
}
</style>
