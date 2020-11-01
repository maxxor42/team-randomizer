<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Advent+Pro:wght@300&display=swap');

body {
  background-color: lightcoral;
}

#app {
  font-family: 'Advent Pro', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}
a, h1, h2, h3, p, button, input {
  font-family: 'Advent Pro', sans-serif;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
