var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    CalendarioView  = require('../views/calendario'),
    Plantilla  = require('../partials/plantilla__calendario'),
    $          = require('jquery'),
    _          = require('underscore');

module.exports = Backbone.View.extend({

  el: $('#calendario'),

  template: Handlebars.compile(Plantilla.__calendario),

  initialize: function () {
    this.listenTo(this.collection, "add", this.addOne, this);
    this.listenTo(this.collection, "reset", this.resetear, this);
  },

  contador: 3,

  resetear: function () {
    this.$el.empty();
  },

  render: function () {
    this.collection.forEach(this.addOne, this);
  },

  addOne: function (calendario) {
    if(this.contador === 3 || !(this.contador%2)){
      this.$el.addClass('doble');
    }else{
      this.$el.removeClass('doble');
    }

    this.contador++;
    var calendarView = new CalendarioView({ model: calendario });
    this.$el.append(calendarView.render().el);
  },

  mostrar: function(){
    this.$el.show();
  },

  ocultar: function(){
    this.$el.hide();
  }



});