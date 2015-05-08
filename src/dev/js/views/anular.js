var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    $          = require('jquery'),
    ui         = require('jquery-ui'),
    Plantilla  = require('../partials/plantilla_anular'),
    Sesion = require('../models/sesion'),
    app        = Backbone.app;

module.exports = Backbone.View.extend({

  el: $('#modalCalendario'),

  template: Handlebars.compile(Plantilla.anular),

  events: {
    'click #anularReserva': 'anular',
    'click #cerrarModal': 'cancelar'
  },

  initialize: function () {
    this.render();
  },

  resetear: function () {
    this.$el.empty();
  },

  render: function () {
  	var reserva = this.model.toJSON();
    var html = this.template(reserva);
    this.$el.html(html).fadeIn();
    return this;
  },



  anular: function(event){
  	event.preventDefault();
    var self = this;
  	var anular = this.model.toJSON();

    // coger check de luz

    console.log("ANULAR", anular);

  	this.model.fetch({
  		data: {
          id_reserva: anular.id_reserva
      },
  		type: 'PUT',
  		success: function(model, response) {
            console.log('RESERVADOOOOO', response);

            $('#modalCalendario div').html('<span>'+response.msg+'</span>');

            setTimeout(function(){
              $('#modalCalendario').fadeOut();
              Backbone.history.loadUrl();
              self.undelegateEvents();
              //Backbone.Events.trigger('resetCalendar', reserva.fecha_pista );
            }, 2000);
            //
        },
        error: function(model, response) {
            console.log('FALLOOOOOO', response);


            $('#modalCalendario div').html('<span>'+response.msg+'</span>');

            setTimeout(function(){
              $('#modalCalendario').fadeOut();
              self.undelegateEvents();
            }, 1500);

        }
    }).done();
  	// id_pista, id_usuario, id_hora, fecha, luz

  },

  cancelar: function(event){
  	event.preventDefault();
  	$('#modalCalendario').fadeOut();
  }

});