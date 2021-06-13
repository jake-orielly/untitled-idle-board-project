<template>
  <span
  >
    G
  </span>
</template>
<script>

export default {
  name: 'Generator',
  props: {
    tick: {
      type: Number,
      required: true
    }
  },
  data() {
    return {}
  },
  watch: {
    tick() {
      this.$emit('gainPoints',1);
    }
  }
}
</script>

<style lang="less" scoped>
</style>
