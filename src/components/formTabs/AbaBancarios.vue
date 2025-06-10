<template>
  <div>
    <v-card class="pa-4 mb-4" flat>
      <h3>Dados Bancários Principais</h3>
      <v-row dense>
        <v-col cols="12" md="6">
          <v-text-field label="Banco" v-model="modelValue.bankDataOne.bankName" />
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field label="Agência" v-model="modelValue.bankDataOne.bankBranch" />
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field label="Conta" v-model="modelValue.bankDataOne.bankAccount" />
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            label="Tipo de Conta"
            :items="tiposConta"
            v-model="modelValue.bankDataOne.bankAccountType"
          />
        </v-col>
      </v-row>
    </v-card>
    <v-card class="pa-4" flat>
      <h3>Dados Bancários Secundários</h3>
      <v-row dense>
        <v-col cols="12" md="6">
          <v-text-field label="Banco" v-model="modelValue.bankDataTwo.bankName" />
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field label="Agência" v-model="modelValue.bankDataTwo.bankBranch" />
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field label="Conta" v-model="modelValue.bankDataTwo.bankAccount" />
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            label="Tipo de Conta"
            :items="tiposConta"
            v-model="modelValue.bankDataTwo.bankAccountType"
          />
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script setup>
defineProps(['modelValue'])
const tiposConta = [
  'currentAccount',   // Corrente
  'savingsAccount',   // Poupança
  // Adicione outros se houver no backend, mas só esses dois constam no enum
]
</script>
