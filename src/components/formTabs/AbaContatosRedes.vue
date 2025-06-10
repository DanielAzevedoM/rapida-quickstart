<template>
  <div>
    <v-card class="pa-4 mb-4" flat>
      <h3>Informações de Contato</h3>
      <v-row dense>
        <v-col cols="12" md="6">
          <v-text-field label="Telefone Principal" v-model="modelValue.phoneNumberOne" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="Telefone Secundário" v-model="modelValue.phoneNumberTwo" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="Email Principal" v-model="modelValue.emailOne" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="Email Alternativo" v-model="modelValue.emailTwo" />
        </v-col>
      </v-row>
    </v-card>
    <v-card class="pa-4" flat>
      <h3>Redes Sociais</h3>
      <v-row dense>
        <v-col cols="12" md="6">
          <v-text-field label="Linkedin" v-model="modelValue.linkedin" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="Instagram" v-model="modelValue.instagram" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="Facebook" v-model="modelValue.facebook" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="X / Twitter" v-model="modelValue.x" />
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script setup>
defineProps(['modelValue'])
</script>
