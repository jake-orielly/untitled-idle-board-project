<template>
  <div id="app">
    <div
      class="grid-container"
    >
      <div>
        <p>
          Points: {{points}}
        </p>
        <hr>
        <StructureShop 
          :structures="structures"
          @buy="buyStructure"
        />
      </div>
      <div>
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
                  :is="board[colVal][rowVal]"
                  @gainPoints="gainPoints"
                  :tick="tick"
                />
                <div
                  v-if="!board[colVal][rowVal] && placing"
                  @click="placeStructure(colVal, rowVal)"
                  class="empty-space"
                >
                  {{placing.img}}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div></div>
    </div>
  </div>
</template>
<script>
const generator = {
  name: "Generator",
  price: (owned) => {
    return 10 + parseInt(Math.pow(2.5 * owned, 1.5));
  },
  img: "G",
  cost: 10,
  owned: 0
};

import ClickerButton from './ClickerButton'
import Generator from './Generator'
import StructureShop from './StructureShop'
export default {
  name: 'GameContainer',
  components: {
    ClickerButton,
    Generator,
    StructureShop
  },
  data() {
    return {
      rows: 2,
      columns: 2,
      board:[],
      points: 30,
      tick:0,
      tickInterval:undefined,
      structures: [
        generator
      ],
      placing: undefined
    }
  },
  created() {
    for (let i = 0; i < this.rows; i++) {
      this.board.push([]);
      for (let j = 0; j < this.columns; j++)
        this.board[i][j] = undefined;
    }
    this.board[0][0] = "ClickerButton";
    this.tickInterval = setInterval(
      () => {
        this.tick++;
      }, 1000
    );
  },
  methods: {
    gainPoints(val) {
      this.points += val;
    },
    buyStructure(structure) {
      let structPrice = structure.price(structure.owned);
      if (this.points > structPrice) {
        this.points -= structPrice;
        this.$set(structure,"owned", structure.owned + 1);
        this.placing = structure;
      }
    },
    placeStructure(x,y) {
      let newRow = [...this.board[x]];
      newRow[y] = this.placing.name;
      this.$set(this.board, x, newRow);
      this.placing = undefined;
    }
  }
}
</script>

<style lang="less" scoped>
.game-board {
  margin-top: 2rem;
  border: 2px solid black;

  td {
    border: 1px solid black;
    width: 2rem;
    height: 2rem;
    padding: 0;
  }
}

.grid-container {
  display: grid;
  grid-template-columns: 15% auto 15%;
}

hr {
  height: 1px;
  background: black;
  border:none;
  width: 80%;
  margin-left: 0%;
}

.empty-space {
  color: white;
  cursor: pointer;

  &:hover {
    color: grey;
  }
}
</style>
