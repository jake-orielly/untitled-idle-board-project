<template>
  <div id="app">
    <table>
      <tr
        v-for="troop in troops"
        :key="troop.class.nameSingular"
      >
        <td>
          {{troop.class.namePlural}}
        </td>
        <td>
          {{troop.number}}
        </td>
      </tr>
    </table>
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
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

class Orc {
  static nameSingular = "Orc";
  static namePlural = "Orcs";

  constructor() {
    this.hp = 10;
    this.strength = 5;
    this.attack = 4;
  }
}

export default {
  name: 'GameContainer',
  data() {
    return {
      rows: 10,
      columns: 14,
      troops: {
        orcs: {
          number:5,
          class: Orc
        }
      },
      board:[]
    }
  }
}
</script>

<style lang="less" scoped>
.game-board {
  border: 1px solid black;

  td {
    border: 1px solid black;
    width: 2rem;
    height: 2rem;
  }
}
</style>
