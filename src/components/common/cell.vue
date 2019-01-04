<template>
  <div class="pureCell">
    {{title}}
  </div>
</template>

<script>
  export default {
    name: "cell",
    props: ["title","test"],
    data(){
      return {

      }
    }
  }
</script>

<style scoped>
.pureCell {
  background-color: cornflowerblue;
  width: 100%;
  height: 3rem;
  border: 1px solid #eee;
  text-align: center;
  line-height: 3rem;
}
</style>