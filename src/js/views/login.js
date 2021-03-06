var Backbone   = require('backbone'),
    _          = require('underscore'),
    Handlebars = require('handlebars'),
    Usuarios = require('../collections/usuarios'),
    Usuario = require('../models/usuario'),
    $          = require('jquery'),
    Plantilla  = require('../partials/plantilla_login'),
    Validator = require('validator'),
    Sha1       = require('sha1'),
    Sesion        = require('../models/sesion'),
    app        = Backbone.app;

module.exports = Backbone.View.extend({
  el: $('#login'),

  events: {
    'click #dologin': 'login',
    'click #goregistro': 'goRegistro',
    'keydown': 'keyAction'
  },

  template: Handlebars.compile(Plantilla.login),

  initialize: function (args) {
    this.render(args);
    var data = args || false;
    if(data !== false){
      $('.error').hide();
      $('#no-error').html(args.msg).slideDown().fadeOut(3000);
    }
  },

  render: function (args) {

    var data = args || {};

    var html = this.template(data);
    this.$el.html(html);
    return this;
  },

  resetear: function () {
    this.$el.empty();
  },

  inputEval: function(formData) {

        var response = {
            datos: {},
            validado: false
        };
        var test = false;

        response.datos.mail = (Validator.isEmail(formData.mail))? true : 'Email incorrecto';
        response.datos.password = (Validator.isLength(formData.password, 6))? true : 'La contraseña debe tener mínimo 6 caracteres';

        test =   !(_.isString(response.datos.mail)) &&
                 !(_.isString(response.datos.password));

        response.validado = test;

        return response;
  },

  keyAction: function(e) {
        var code = e.keyCode || e.which;
        if(code == 13) this.login();
  },

  login: function(evt){
    if(evt) evt.preventDefault();

        var url = '/api/login';
        var user = $('#login_user_input');
        var pwd = $('#login_pass_input');

        var formValues = {
            mail: user.val(),
            password: pwd.val()
        };

        var validar = this.inputEval(formValues);

        if(validar.validado === true){

          formValues.password = Sha1(formValues.password);


          $.ajax({
              url:url,
              type:'POST',
              dataType:"json",
              data: formValues,
              success:function (data) {
                  if(data.estado=="error") {  // If there is an error, show the error messages
                       $('.error').hide();
                       $('#error').html(data.msg).slideDown();
                  } else {
                      $('.error').hide();
                      $('#no-error').html('Welcome !!!').slideDown();
                      Sesion.setSesiondata(data.usuario);
                      Backbone.app.navigate("", { trigger: true });
                  }
              }
          });
        }else{

          mensajesError = _.omit(validar.datos, function(value, key, object) {
            return value === true;
          });

          printErrores = '<ul>';

          _.each(mensajesError, function(val){
              printErrores += '<li>' + val + "</li>";
          });

          printErrores += '<ul>';

          $('#error').html(printErrores).slideDown();

        }
  },

  goRegistro: function (event) {
    event.preventDefault();
    Backbone.app.navigate("registro", { trigger: true });
  }

});