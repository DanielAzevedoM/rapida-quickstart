<template>
   <NavBar></NavBar>

  <v-main>
    <router-view />
  </v-main>
  
  <Footer></Footer>

</template> 

<script setup>
  //
</script>
<style scoped>
.v-main{
  min-height: 993px;
}

</style>