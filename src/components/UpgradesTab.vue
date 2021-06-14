<template>
  <div>
    <div
      v-for="upgrade in upgrades.filter(
        upgrade => upgrade.bought == false
      )"
      :key="'upgrade-' + upgrade.name"
      @click="buyUpgrade(upgrade)"
      class="upgrade-row"
    >
      <span>
        {{upgrade.name}}
      </span>
      <span>
        {{upgrade.cost}}
      </span>
    </div>
  </div>
</template>
<script>

export default {
  name: 'UpgradesTab',
  props: {
    upgrades: {
      type: Array,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    buyUpgrade(upgrade) {
      this.$emit('buyUpgrade', upgrade);
    }
  },
}
</script>

<style lang="less" scoped>
.upgrade-row {
  display: grid;
  grid-template-columns: 50% 50%;
  cursor: pointer;
  user-select: none;
}
</style>
