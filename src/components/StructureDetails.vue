<template>
  <div>
    <div
      v-if="structure"
    >
      <p>
        {{structure.action}}: {{structure.name}}
      </p>
      <button
        @click="$emit('deleteStructure')"
      >
        Delete
      </button>
    </div>
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
