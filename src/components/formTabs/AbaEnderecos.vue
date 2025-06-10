<template>
  <div>
    <v-card class="pa-4 mb-4" flat>
      <h3>Endereço Principal</h3>
      <v-row dense>
        <v-col cols="12" md="4">
          <v-text-field label="CEP" v-model="modelValue.addressOneCepBrasilApi" />
        </v-col>
        <v-col cols="12" md="4">
          <v-select label="Tipo de Endereço" :items="tipos" v-model="modelValue.addressOneType" />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field label="Logradouro" v-model="modelValue.addressOneStreet" />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field label="Número" v-model="modelValue.addressOneNumber" />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field label="Complemento" v-model="modelValue.addressOneComplement" />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field label="Cidade" v-model="modelValue.addressOneCity" />
        </v-col>
        <v-col cols="12" md="4">
          <v-select label="Estado" :items="estados" v-model="modelValue.addressOneState" />
        </v-col>
      </v-row>
    </v-card>
    <v-card class="pa-4" flat>
      <h3>Endereço Secundário</h3>
      <v-row dense>
        <v-col cols="12" md="4">
          <v-text-field label="CEP" v-model="modelValue.addressTwoCepBrasilApi" />
        </v-col>
        <v-col cols="12" md="4">
          <v-select label="Tipo de Endereço" :items="tipos" v-model="modelValue.addressTwoType" />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field label="Logradouro" v-model="modelValue.addressTwoStreet" />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field label="Número" v-model="modelValue.addressTwoNumber" />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field label="Complemento" v-model="modelValue.addressTwoComplement" />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field label="Cidade" v-model="modelValue.addressTwoCity" />
        </v-col>
        <v-col cols="12" md="4">
          <v-select label="Estado" :items="estados" v-model="modelValue.addressTwoState" />
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script setup>
const tipos = [
  { title: 'Residencial', value: 'residential' },
  { title: 'Comercial', value: 'commercial' },
  { title: 'Outro', value: 'other' }
]
const estados = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG',
  'PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'
]
defineProps(['modelValue'])
</script>
