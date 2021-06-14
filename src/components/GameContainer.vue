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
                :key="`cell-${rowVal}-${colVal}`"
                @click="selectStructure(rowVal, colVal)"
              >
                <component 
                  :is="board[rowVal][colVal].structure"
                  :ref="'structure-' + rowVal + '-' + colVal"
                  :tick="tick"
                  @gainPoints="(val) => gainPoints(rowVal, colVal, val)"
                />
                <div
                  v-if="!board[rowVal][colVal].structure && placing"
                  @click="placeStructure(rowVal, colVal)"
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
        <p>
          <span
            @click="selectRightTab('details')"
            class="tabSelection"
          >
            Selection
          </span>
          <span
            @click="selectRightTab('upgrades')"
            class="tabSelection"
          >
            Upgrades
          </span>
        </p>
        <hr>
        <StructureDetails 
          v-if="rightTab == 'details'"
          :structure="selectedStructure"
        />
        <UpgradesTab
          v-else-if="rightTab == 'upgrades'"
          :upgrades="upgrades"
          @buyUpgrade="buyUpgrade"
        />
      </div>
    </div>
  </div>
</template>
<script>

const cardinalDirs = [
  [0,1],
  [1,0],
  [0,-1],
  [-1,0]
];


import structureRepresentations from '../js/structureDescriptors'

import Buffer from './Buffer'
import ClickBuffer from './ClickBuffer'
import ClickerButton from './ClickerButton'
import Generator from './Generator'
import StructureDetails from './StructureDetails'
import StructureShop from './StructureShop'
import UpgradesTab from './UpgradesTab'

export default {
  name: 'GameContainer',
  components: {
    Buffer,
    ClickBuffer,
    ClickerButton,
    Generator,
    StructureDetails,
    StructureShop,
    UpgradesTab
  },
  data() {
    return {
      rows: 2,
      columns: 2,
      board:[],
      points: 30,
      tick:0,
      tickInterval:undefined,
      structures: structureRepresentations,
      placing: undefined,
      placingCost: undefined,
      selectedStructure: undefined,
      rightTab: "details",
      upgrades: [
        {
          name: "Extra Column",
          cost: 30,
          bought: false,
          func: () => {
            this.columns++;
            for (let i = 0; i < this.rows; i++)
              this.board[i][this.columns - 1] = {
                structure: undefined,
                buffs:[]
              };
          }
        }
      ]
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
      if (this.placingCost)
        this.points += this.placingCost;
      if (this.points > structPrice) {
        this.points -= structPrice;
        this.placing = structure;
        this.placingCost = structPrice;
        this.selectedStructure = {
          name: structure.name,
          action: "Buying"
        };
      }
    },
    buyUpgrade(upgrade) {
      let upgradeCost = upgrade.cost;
      if (this.points >= upgradeCost) {
        this.points -= upgradeCost;
        upgrade.func();
        upgrade.bought = true;
      }
    },
    selectStructure(x,y) {
      this.selectedStructure = {
        name: this.board[x][y].structure,
        action: "Selected"
      };
    },
    selectRightTab(tab) {
      this.rightTab = tab;
    },
    placeStructure(x,y) {
      let newRow = [...this.board[x]];
      newRow[y].structure = this.placing.name;
      if (this.placing.buffFunc)
        this.addBuffs(x,y,this.placing.buffFunc);
      this.$set(this.board, x, newRow);
      this.$set(this.placing,"owned", this.placing.owned + 1);
      this.placing = undefined;
      this.placingCost = undefined;
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

.tabSelection {
  text-decoration: underline;
  cursor: pointer;
  margin-right: 1rem;
}
</style>
