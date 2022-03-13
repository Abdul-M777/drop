<template>
  <header>
    <Navbar />
  </header>
</template>

<script>
import Navbar from "../components/NavBar.vue";
export default {
  name: "dropdown",
  components: {
    Navbar,
  },
};
</script>

<style>
body {
  font-family: "montserrat", sans-serif;
}

header {
  width: 100vw;
  background-color: #222;
  padding: 15px;
}
</style>
