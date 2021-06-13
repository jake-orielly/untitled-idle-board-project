<template>
  <div>
    <p>Selected: 
      <span
        v-if="structure"
      >
        {{structure.name}}
      </span>
      <span
        v-else
      >
        None
      </span>
    </p>
  </div>
</template>
<script>

export default {
  name: 'StructureDetails',
  props: {
    structure: {
      type: Object,
      required: false
    }
  },
  data() {
    return {}
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>

</style>
