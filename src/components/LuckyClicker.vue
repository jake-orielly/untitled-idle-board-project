<template>
  <button
    @click="clickHandler"
    :class="{ cooldown: cooldown > 0}"
    :style="{
      backgroundColor: (cooldown ? 'grey' : luckyColor())
    }"
  >
    LC
  </button>
</template>
<script>

export default {
  name: 'ClickerButton',
  props: {
    tick: {
      type: Number,
      required: true
    }
  },
  watch: {
    tick(tick) {
      this.cooldown = Math.max(this.cooldown - 1, 0);
      if (!this.cooldown && tick % 4 == 0) {
        let randVal = Math.random() * 4;
        for (let val of this.valsArr) {
          if (val[0] < randVal) {
            this.val = val[1];
            break;
          }
        }
      }
    }
  },
  data() {
    return {
      cooldown: 0,
      val: 1,
      valsArr: [
        [3.7,25],
        [2.6,8],
        [1.4,3],
        [0,1],
      ]
    }
  },
  methods: {
    clickHandler() {
      if (!this.cooldown) {
        this.cooldown = 10;
        this.$emit('gainPoints',this.val);
      }
    },
    luckyColor() {
      switch(this.val) {
        case this.valsArr[0][1]:
          return "gold";
        case this.valsArr[1][1]:
          return "blue";
        case this.valsArr[2][1]:
          return "green";
        default:
          return "";
      }
    }
  }
}
</script>

<style lang="less" scoped>
.cooldown {
  background-color: grey !important;
}
</style>
