Vue.config.devtools = true;
<template>
  <div class="container">
    <div class="display-split">
      <div class="display-left">
        <div class="memolist">
          <ul
            v-for="memo in memos"
            v-bind:key="memo.id"
            @click="editMemo(memo)"
          >
            <li>{{ memo.content[0] }}</li>
          </ul>
          <p v-show="showMemo == false || memos == ''">
            <button @click="addMemo">+</button>
          </p>
        </div>
      </div>
      <div class="display-right">
        <div class="detail" v-show="detail.content !== '' && showMemo">
          <textarea v-model="detail.content"></textarea>
          <div>
            <button @click="updateMemo(detail.id)">Edit</button>
            <button @click="deleteMemo(detail.id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let nextMemoId = 0;

export default {
  data: function() {
    return {
      memos: [],
      detail: { content: "" },
      showMemo: true
    };
  },
  mounted() {
    const getjson = localStorage.getItem("memos");
    console.log(getjson);
    if (getjson) {
      try {
        this.memos = JSON.parse(getjson);
      } catch (e) {
        localStorage.removeItem("memos");
      }
    }
  },
  methods: {
    addMemo() {
      this.memos.push({
        id: nextMemoId++,
        content: ["新規メモ"]
      });
      this.saveMemo();
      this.showMemo = false;
    },
    editMemo(memo) {
      this.showMemo = true;
      this.detail = memo;
      memo.content = memo.content.join("\n");
    },
    updateMemo(detailId) {
      this.memos = this.memos.filter(memo => memo.id !== detailId);
      this.detail.content = this.detail.content.split("\n");
      this.memos.unshift(this.detail);
      this.saveMemo();
      this.showMemo = false;
    },
    deleteMemo(detailId) {
      this.memos = this.memos.filter(memo => memo.id !== detailId);
      this.saveMemo();
      this.showMemo = false;
    },
    saveMemo() {
      const setjson = JSON.stringify(this.memos);
      localStorage.setItem("memos", setjson);
    }
  }
};
</script>

<style scope>
.display-split {
  display: flex;
}

.display-right,
.display-left {
  position: relative;
  width: 100%;
  margin-bottom: 30px;
}

.memolist {
  float: right;
  margin-right: 50px;
}

li {
  list-style: none;
}

.detail {
  float: left;
  margin-left: 50px;
}

textarea {
  width: 200px;
  height: 200px;
  margin: 10px;
}
</style>
