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
            {{parseInt(getArmy(rowVal, colVal))}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

class Unit {
  static nameSingular= "Unit";
  static namePlural = "Units";
  static hp = 1;
  static attack = 1;
  static strength = 1;

  static getLevel() {
    return (this.hp + this.strength + this.attack) / 3;
  }
}

class Orc extends Unit {
  static nameSingular = "Orc";
  static namePlural = "Orcs";
  static hp = 10;
  static attack = 3;
  static strength = 6;
}

class Wolf extends Unit {
  static nameSingular = "Wolf";
  static namePlural = "Wolves";
  static hp = 5;
  static attack = 3;
  static strength = 3;
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
  },
  created() {
    for (let x = 0; x < this.rows; x++) {
      this.board.push([])
      for (let y = 0; y < this.columns; y++)
        this.board[x][y] = {
          units: undefined,
          structures: undefined,
          terrain: "grass"
        }
    }
    this.board[2][2].units = {
      type: Wolf,
      number: 3
    };
  },
  methods: {
    getArmy(row, col) {
      return this.board[row][col].units?.type.getLevel();
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
