<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  background-color: rgb(94, 93, 180);
  height: 100%;
  position: relative;
}
a {
  text-decoration: none;
}
div {
  box-sizing: border-box;
}

/* icon */
.icon-info {
  font-size: 2rem;
}

.iconfont:active {
  color:brown;
}
</style>
