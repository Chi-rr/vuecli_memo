<template>
  <div id="app">
    <h1>メモリスト</h1>
    <MemoList />
  </div>
</template>

<script>
import MemoList from "@/components/MemoList";
export default {
  components: {
    MemoList
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3ba173;
  background-color: aquamarine;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
</style>
