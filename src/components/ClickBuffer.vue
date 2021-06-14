<template>
  <button
    @click="clickHandler"
    :style="{ backgroundColor: heatColor() }"
  >
    CB
  </button>
</template>
<script>

export default {
  name: 'ClickBuffer',
  props: {
    tick: {
      type: Number,
      required: true
    }
  },
  watch: {
    tick() {
      this.buffVal = Math.max(this.buffVal * 0.85, 1)
    }
  },
  data() {
    return {
      buffVal: 1
    }
  },
  methods: {
    clickHandler() {
      this.buffVal = 3;
    },
    heatColor() {
      const redVal = 255 - 255 * (this.buffVal - 1) / 2;
      return `rgb(255,${redVal},${redVal})`;
    }
  }
}
</script>

<style lang="less" scoped>
</style>
