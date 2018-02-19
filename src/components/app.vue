<template>
<div class="page app">
  <form class="equationForm" v-on:submit.prevent>
    <input class="equationInput" type="text" name="equation" value="" placeholder="Type Equation Here">
  </form>
</div>
</template>
<script>
import '../assets/app.css'
export default {
  name: "app",
  data: () => ({

  })
}
</script>
