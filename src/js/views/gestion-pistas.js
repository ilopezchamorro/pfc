var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    Plantilla  = require('../partials/plantilla_gestion_pista'),
    AddPistaView  = require('../views/add-pista'),
    _          = require('underscore'),
    $          = require('jquery');

module.exports = Backbone.View.extend({

  el: $('#gestion_pistas'),

  template: Handlebars.compile(Plantilla.gestion_pista),

  events: {
    // "change select" :"changed",
    'click input': 'converting',
    'blur input': 'descoverting',
    'touchstart input': 'converting',
    'keydown': 'keyAction',
    "change .wrap-pistas input" :"updatePista",
    'click #deletePista': 'deletePista',
    'click #addpista': 'addPista'
  },

  converting: function (e) {
    var elem = e.target;
    var elemData = $("#" + elem.id);
    elemData.removeClass('disabled');
    elemData.focus();
  },

  descoverting: function (e) {
    var elem = e.target;
    var elemData = $("#" + elem.id);

    elemData.addClass('disabled');
  },

  keyAction: function(e) {
        var code = e.keyCode || e.which;
        if(code == 13) this.descoverting(e);
  },

  initialize: function () {
    // this.listenTo(this.collection, "add", this.addOne, this);
    this.listenTo(this.collection, "reset", this.resetear, this);
  },

  resetear: function () {
    this.$el.empty();
  },

  render: function () {
    var models = this.collection.toJSON();

    var pistas = models[0].pistas;
    var html = this.template({pistas: pistas});
    this.$el.html(html);
    return this;
  },

  changed: function(e){
    // console.log('modificada pista', e.currentTarget.id);
    // console.log('modificada pista', e.currentTarget.value);
  },


  addPista: function(e){
    if(e) e.preventDefault();
    var models = this.collection.toJSON();
    var deportes = models[0];

    this.addPistaView = new AddPistaView({model: deportes});
  },

  updatePista: function (e){
    if(e) e.preventDefault();


    // console.log('VALOR modificada pista', e.currentTarget.value);

    var self = this;
    var mensajesError = {};
    var printErrores = '';

    var id_pista = $(e.currentTarget).attr('data-pista');
    var tipo_dato = $(e.currentTarget).attr('data-tipo');
    var val_dato = e.currentTarget.value;



    var formValues = {
      id_pista: id_pista
    };

    if(tipo_dato == 'precio_luz') formValues.precio_luz = val_dato;
    if(tipo_dato == 'precio_pista') formValues.precio_pista = val_dato;
    if(tipo_dato == 'nombre') formValues.nombre = val_dato;



    // console.log('dataBorrarUser', formValues);



    $.ajax({
        url:'/api/modificarPista',
        type:'POST',
        dataType:"json",
        data: formValues,
        success:function (data) {

            if(data.estado=="error") {
                $('.error').hide();
                $('#error-gestion').html(data.msg).slideDown().fadeOut(5000);
            } else {
                Backbone.Events.trigger('resetGestion', data);
            }
        }
    });
  },


  deletePista: function(e){

      if(e) e.preventDefault();

      var confirmar = confirm('¿seguro que quiere eliminar la pista?');

      if(confirmar === true){
        var idPista = $(e.currentTarget).attr('data-pista');

      var formValues = {
            id_pista: idPista
        };

       $.ajax({
          url:'/api/eliminarPista',
          type:'POST',
          dataType:"json",
          data: formValues,
          success:function (data) {
              // console.log(["Register request details: ", data]);
              // console.log(data.msg);

              if(data.estado=="error") {
                $('.error').hide();
                $('#error-gestion').html(data.msg).slideDown().fadeOut(5000);
              } else {
                Backbone.Events.trigger('resetGestion', data);
              }
          }
       });
      }


  },


  mostrar: function(){
    this.$el.show();
  },

  ocultar: function(){
    this.$el.hide();
  }

});
