var app = new Vue({
  el: '#app',
  data: {
    equation: '',
    result: ''
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
            console.log(store)
            if (store) {
              $('#oldResults').prepend('<p>' + this.equation + ' = ' + this.result + '</p>')
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
    }
  }
})
