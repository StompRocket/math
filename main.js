var app = new Vue({
  el: '#app',
  data: {
    equation: '',
    result: '',
    oldResults: []
  },
  methods: {
    evaluate: function (store) {
      try {
        if (this.equation) {
          var result = math.eval(this.equation)
          if (!JSON.stringify(result).indexOf('function') >= 0) {
            if (result.entries) {
              this.result = result.entries
            } else {
              this.result = result
            }
            //console.log(store)
            if (store) {
              this.oldResults.unshift(this.equation + " = " + this.result)


              this.equation = this.result
            }
          } else {
            this.result = ''
          }
        } else {
          this.result = ''
        }
      } catch (err) {
        // window.alert(err)
      }
    },
    removeItem: function (item) {
      console.log(this.oldResults);
      console.log(item);
      var index = this.oldResults.indexOf(item)
      this.oldResults.splice(index, 1)
        console.log(this.oldResults);
    }
  }
})
