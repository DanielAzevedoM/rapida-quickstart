<template>
  <v-card class="pa-4" flat>
    <h3>Formação Acadêmica</h3>
    <v-row dense>
      <v-col cols="12" md="6">
        <v-select label="Nível de Escolaridade" :items="escolaridades" v-model="modelValue.personEducation" />
      </v-col>
      <v-col cols="12" md="12">
        <span>Idiomas</span>
        <div class="chip-row">
          <v-chip
            v-for="idioma in idiomas"
            :key="idioma"
            :color="modelValue.personLanguages.includes(idioma) ? 'primary' : 'grey-darken-2'"
            @click="toggleIdioma(idioma)"
            class="ma-1"
            variant="elevated"
          >
            {{ idioma }}
          </v-chip>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>
<script setup>
const props = defineProps(['modelValue'])
const escolaridades = [
  // Use aqui os values do DTO se quiser enviar direto (recomendado)
  { title: 'Fundamental Incompleto', value: 'incompleteElementarySchool' },
  { title: 'Fundamental Completo', value: 'completeElementarySchool' },
  { title: 'Médio Incompleto', value: 'incompleteHighSchool' },
  { title: 'Médio Completo', value: 'completeHighSchool' },
  { title: 'Superior Incompleto', value: 'incompleteHigherEducation' },
  { title: 'Superior Completo', value: 'completeHigherEducation' },
  { title: 'Pós-Graduação', value: 'postgraduate' },
  { title: 'Mestrado', value: 'mastersDegree' },
  { title: 'Doutorado', value: 'doctorate' },
  { title: 'Outro', value: '' },
]
const idiomas = [
  'Português', 'Inglês', 'Espanhol', 'Francês', 'Alemão',
  'Italiano', 'Japonês', 'Chinês', 'Outro'
]
function toggleIdioma(idioma) {
  const idx = props.modelValue.personLanguages.indexOf(idioma)
  if (idx >= 0) props.modelValue.personLanguages.splice(idx, 1)
  else props.modelValue.personLanguages.push(idioma)
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
