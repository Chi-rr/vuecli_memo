<template>
  <div class="container">
    <div class="display-split">
      <div class="display-left">
        <div class="memolist">
          <ul v-for="memo in memos" v-bind:key="memo.id">
            <li @click="editMemo(memo)">
              {{ memo.content[0] }}
            </li>
          </ul>
          <p v-show="!showMemo || memos === ''">
            <button @click="addMemo">+</button>
          </p>
        </div>
      </div>
      <div class="display-right">
        <div class="detail" v-show="showMemo">
          <textarea v-model="detail.content"></textarea>
          <div>
            <button @click="updateMemo(detail.id)">更新</button>
            <button @click="deleteMemo(detail.id)">削除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      memos: [],
      memoId: 0,
      detail: { content: "" },
      showMemo: true
    };
  },
  mounted() {
    const getjson = localStorage.getItem("memos");
    getjson
      ? (this.memos = JSON.parse(getjson))
      : localStorage.removeItem("memos");
    this.showMemo = false;
  },
  computed: {
    nextId() {
      const ids = this.memos.map(memo => memo.id);
      return ids.length === 0 ? 0 : Math.max(...ids) + 1;
    }
  },
  methods: {
    addMemo() {
      this.memos.push({
        id: this.nextId,
        content: ["新規メモ"]
      });
      this.saveMemo();
      this.showMemo = false;
    },
    editMemo(memo) {
      if (!this.showMemo) {
        this.showMemo = true;
        this.detail = { ...memo };
        this.detail.content = this.detail.content.join("\n");
      }
    },
    updateMemo(detailId) {
      if (this.detail.content) {
        this.memos = this.memos.map(({ content, ...rests }) => ({
          ...rests,
          content:
            rests.id === detailId ? this.detail.content.split("\n") : content
        }));
        this.saveMemo();
        this.showMemo = false;
      }
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
