<template>
<div class="page app">
  <form class="equationForm" v-on:submit.prevent='eval(true)'>
    <input id="equationInput" autocomplete="off" autofocus="true" v-on:keyup="eval(false)" v-model="equation" class="equationInput" type="text" name="equation" value="" placeholder="Type Equation Here">
  </form>
  <h2 class="answer">{{result}}</h2>
  <div class="historyContainer">
    <p @click="add(item)" class="historyItem" v-for="item in history">{{item}}</p>
  </div>
</div>
</template>
<script>
import '../assets/app.css'
var math = require('mathjs')
const mathsteps = require('mathsteps');
export default {
  name: "app",
  data: () => ({
    history: ['5*2 == 10'],
    equation: '',
    result: '0'
  }),
  methods: {
    add(item) {
      this.equation = item
      this.eval(false)
      document.getElementById("equationInput").focus();
    },
    eval(save) {

      if (this.equation) {
        if (this.equation.substring(0, 1) == ':') {
          if (this.equation.substring(0, 6) == ':solve') {
            let steps = mathsteps.solveEquation(this.equation.slice(6))
            steps.forEach(step => {
              console.log("before change: " + step.oldEquation.ascii()); // e.g. before change: 2x + 3x = 35
              console.log("change: " + step.changeType); // e.g. change: SIMPLIFY_LEFT_SIDE
              console.log("after change: " + step.newEquation.ascii()); // e.g. after change: 5x = 35
              console.log("# of substeps: " + step.substeps.length); // e.g. # of substeps: 2
            });
            if (steps[1]) {
              this.result = steps[steps.length - 1].newEquation.ascii()
              if (save) {
                this.history.unshift(this.equation + ' / ' + this.result)
                this.equation = this.result
              }
            } else {
              this.result = '0'
              if (save) {

                this.equation = this.result
              }
            }


          }
        } else {
          var result = math.eval(this.equation)
          if (!JSON.stringify(result).indexOf('function') >= 0) {
            if (result.entries) {
              this.result = result.entries
            } else {
              this.result = result
            }
            // console.log(store)
            if (save) {
              if (this.equation !== this.result) {
                this.history.unshift(this.equation + ' == ' + this.result)
              }
              this.equation = this.result
            }
          } else {
            this.result = '0'
          }
        }
      } else {
        this.result = '0'
      }

    }
  }
}
</script>
