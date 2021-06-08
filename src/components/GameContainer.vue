<template>
  <div id="app">
    <p>{{points}}</p>
    <table
      cellspacing="0"
      class="game-board"
    >
      <tbody>
        <tr
          v-for="(row, rowVal) in rows"
          :key="`row-${rowVal}`"
        >
          <td
            v-for="(col, colVal) in columns"
            :key="`cell-${colVal}-${rowVal}`"
          >
            <component 
              :is="'ClickerButton'"
              @gainPoints="gainPoints"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import ClickerButton from './ClickerButton'
export default {
  name: 'GameContainer',
  components: {
    ClickerButton
  },
  data() {
    return {
      rows: 2,
      columns: 2,
      board:[],
      points: 0
    }
  },
  methods: {
    gainPoints(val) {
      this.points += val;
    }
  }
}
</script>

<style lang="less" scoped>
table {
  border: 2px solid black;

  td {
    border: 1px solid black;
    width: 2rem;
    height: 2rem;
  }
}
</style>
