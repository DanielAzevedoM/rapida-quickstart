<template>
  <div>
    <v-card class="pa-4 mb-4" flat>
      <h3>Documentos Pessoais</h3>
      <v-row dense>
        <v-col cols="12" md="6">
          <v-text-field label="CPF" v-model="modelValue.cpf" />
        </v-col>
        <v-col cols="12" md="6">
          <v-file-input label="Arquivo do CPF" v-model="modelValue.cpfFile" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="RG" v-model="modelValue.rg" />
        </v-col>
        <v-col cols="12" md="6">
          <v-file-input label="Arquivo do RG" v-model="modelValue.rgFile" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="Órgão Emissor do RG" v-model="modelValue.rgIssuingAuthority" />
        </v-col>
        <v-col cols="12" md="6">
          <v-select label="Estado Emissor" :items="estados" v-model="modelValue.rgState" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="Data de Emissão" v-model="modelValue.rgIssuanceDate" type="date" />
        </v-col>
      </v-row>
    </v-card>
    <v-card class="pa-4" flat>
      <h3>Dados de Passaporte</h3>
      <v-row dense>
        <v-col cols="12" md="6">
          <v-text-field label="Passaporte" v-model="modelValue.passport" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="Data de Emissão do Passaporte" v-model="modelValue.passportIssuanceDate" type="date" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="Data de Expiração do Passaporte" v-model="modelValue.passportExpirationDate" type="date" />
        </v-col>
        <v-col cols="12" md="6">
          <v-file-input label="Arquivo do Passaporte" v-model="modelValue.passportFile" />
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script setup>
const props = defineProps(['modelValue'])
const estados = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG',
  'PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'
]
</script>
