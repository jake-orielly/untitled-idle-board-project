<template>
  <div>
    <p
      v-if="structure"
    >
      {{structure.action}}: 
      <span>
        {{structure.name}}
      </span>
    </p>
    <p
      v-else
    >
      Nothing selected
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
