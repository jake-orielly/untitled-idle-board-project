<template>
  <div>
    <div
      v-for="structure in structures"
      :key="'structure-' + structure.name"
      class="shop-container"
    >
      <p>{{structure.name}}</p>
      <p>{{structure.price(structure.owned)}}</p>
      <button
        @click="buy(structure)"
      >
        Buy
      </button>
    </div>
  </div>
</template>
<script>

export default {
  name: 'StructureShop',
  props: {
    structures: {
      type: Array,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    buy(structure) {
      this.$emit('buy',structure);
    }
  }
}
</script>

<style lang="less" scoped>
.shop-container {
  display: grid;
  grid-template-columns: 50% 15% 15%;
}

button {
  height: 1.5rem;
  margin: auto;
}
</style>
