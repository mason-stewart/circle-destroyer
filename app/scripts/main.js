Circle = Backbone.Model.extend({
  defaults: function(){
    this.set(this.randomize())
  },

  initialize: function(){
    console.log('Hey I was born! Thanks!')
  },

  randomize: function(){
    var size = Math.floor(Math.random()*200 + 10) + 'px';
    return {   
      background: '#'+Math.floor(Math.random()*16777215).toString(16),
      width: size,
      height: size,
      top: Math.floor(Math.random()*900 + 10),
      left: Math.floor(Math.random()*900 + 10),
      transform: "rotate(" + Math.floor(Math.random()*360) + "deg)",
      transitionDuration: Math.random()*2000+1000 + 'ms'
    }
  }
})

CircleCollection = Backbone.Collection.extend({
  model: Circle,

  initialize: function(){
    console.log('A collection was made! Rad!')
  }
})




CircleView = Backbone.View.extend({
  className: 'circle',

  events: {
    'click': 'destroy',
    'mouseover': 'scatter'
  },

  scatter: function(){
    this.model.set(this.model.randomize())
    this.render()
  },

  initialize: function(){

    $('.container').append(this.el)
    this.render();

    var that = this
    setInterval(function(){
      that.model.set(that.model.randomize())
      that.render()
    }, 10000)
  },

  render: function(){
    this.$el.css(this.model.attributes)
  },

  destroy: function(){
    this.model.destroy()
    this.remove()
  }
})



// create an instance of CircleCollection
var circles = new CircleCollection()

circles.on('add', function(circle){
  new CircleView({model: circle})
})

circles.on('remove', function(model, collection){
  $('h2').text(collection.length + ' circles remaing')
})

for (var i = 0; i < 100; i++){
  circles.add({})
}