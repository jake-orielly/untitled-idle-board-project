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
        @click="buy(structure.class)"
      >Buy</button>
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
  grid-template-columns: 40% 20% 20%;
}
</style>
