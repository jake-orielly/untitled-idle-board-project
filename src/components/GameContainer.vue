<template>
  <div id="app">
    <div
      class="grid-container"
    >
      <div>
        <p>
          Points: {{parseInt(points)}}
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
                @click="selectStructure(colVal, rowVal)"
              >
                <component 
                  :is="board[colVal][rowVal].structure"
                  :ref="'structure-' + colVal + '-' + rowVal"
                  :tick="tick"
                  @gainPoints="(val) => gainPoints(colVal, rowVal, val)"
                />
                <div
                  v-if="!board[colVal][rowVal].structure && placing"
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
      <div>
        <StructureDetails 
          :structure="selectedStructure"
        />
      </div>
    </div>
  </div>
</template>
<script>
const clickerButton = {
  name: "ClickerButton",
  price: (owned) => {
    return 3 + parseInt(Math.pow(1.5 * owned, 1.25)); 
  },
  img: ":)",
  owned: 0
}

const generator = {
  name: "Generator",
  price: (owned) => {
    return 10 + parseInt(Math.pow(2.5 * owned, 1.5));
  },
  img: "G",
  owned: 0
};

const buffer = {
  name: "Buffer",
  price: (owned) => {
    return 15 + parseInt(Math.pow(3.5 * owned, 1.75));
  },
  img: "B",
  owned: 0,
  buffFunc: (val) => {
    return val * 2;
  },
  buffRange: 1
}

const clickBuffer = {
  name: "ClickBuffer",
  price: (owned) => {
    return 25 + parseInt(Math.pow(3.5 * owned, 1.85));
  },
  img: "CB",
  owned: 0,
  buffFunc: (val, parent) => {
    return val * parent.buffVal;
  },
  buffRange: 1
}

const cardinalDirs = [
  [0,1],
  [1,0],
  [0,-1],
  [-1,0]
];

import Buffer from './Buffer'
import ClickBuffer from './ClickBuffer'
import ClickerButton from './ClickerButton'
import Generator from './Generator'
import StructureDetails from './StructureDetails'
import StructureShop from './StructureShop'

export default {
  name: 'GameContainer',
  components: {
    Buffer,
    ClickBuffer,
    ClickerButton,
    Generator,
    StructureDetails,
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
        clickerButton,
        generator,
        buffer,
        clickBuffer
      ],
      placing: undefined,
      selectedStructure: undefined
    }
  },
  created() {
    for (let i = 0; i < this.rows; i++) {
      this.board.push([]);
      for (let j = 0; j < this.columns; j++)
        this.board[i][j] = {
          structure: undefined,
          buffs:[]
        };
    }
    this.board[0][0].structure = "ClickerButton";
    this.tickInterval = setInterval(
      () => {
        this.tick++;
      }, 1000
    );
  },
  methods: {
    gainPoints(x,y, val) {
      let parent;
      for (let buff of this.board[x][y].buffs) {
        parent = this.$refs[`structure-${buff.parent[0]}-${buff.parent[1]}`][0]
        val = buff.buffFunc(val, parent);
      }
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
    selectStructure(x,y) {
      this.selectedStructure = {
        name: this.board[x][y].structure
      };
    },
    placeStructure(x,y) {
      let newRow = [...this.board[x]];
      newRow[y].structure = this.placing.name;
      if (this.placing.buffFunc)
        this.addBuffs(x,y,this.placing.buffFunc);
      this.$set(this.board, x, newRow);
      this.placing = undefined;
    },
    addBuffs(x, y, buffFunc) {
      let newX, newY;
      for (let dir of cardinalDirs) {
        newX = x + dir[0];
        newY = y + dir[1]; 
        if (this.onBoard(newX, newY))
          this.board[newX][newY].buffs.push({
            buffFunc:buffFunc,
            parent:[x,y]
          });
      }
    },
    onBoard(x,y) {
      return x >= 0 && y >= 0 && x < this.rows && y < this.columns;
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
  grid-template-columns: 15% 15% 15%;
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
