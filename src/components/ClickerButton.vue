<template>
  <button
    @click="clickHandler"
    :class="{ cooldown: cooldown > 0}"
  >
    :)
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
    tick() {
      this.cooldown = Math.max(this.cooldown - 1, 0);
    }
  },
  data() {
    return {
      cooldown: 0
    }
  },
  methods: {
    clickHandler() {
      if (!this.cooldown) {
        this.cooldown = 2;
        this.$emit('gainPoints',1);
      }
    }
  }
}
</script>

<style lang="less" scoped>
.cooldown {
  background-color: grey;
}
</style>
