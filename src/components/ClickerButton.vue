<template>
  <button
    @click="clickHandler"
  >
    :)
  </button>
</template>
<script>

export default {
  name: 'ClickerButton',
  data() {
    return {}
  },
  methods: {
    clickHandler() {
      this.$emit('gainPoints',1);
    }
  }
}
</script>

<style lang="less" scoped>
</style>
