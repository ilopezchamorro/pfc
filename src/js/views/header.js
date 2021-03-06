var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    $          = require('jquery'),
    _          = require('underscore'),
    ui         = require('jquery-ui'),
    Plantilla  = require('../partials/plantilla_header'),
    PlantillaAdmin  = require('../partials/plantilla_header_admin'),
    Sesion     = require('../models/sesion');
    // app        = Backbone.app;

module.exports = Backbone.View.extend({

  el: $('#header'),

  template: Handlebars.compile(Plantilla.header),
  templateAdmin: Handlebars.compile(PlantillaAdmin.header),

  events: {
    'click #logotipoLink': 'goHome',
    'click #logout': 'logout',
    'click #doNothing': 'goUserResume',
    'click #user-welcome': 'goUserResume',
    'click #user-welcome-2': 'goMisResrvas',
    'click #reservasAdmin': 'goreservas',
    'click #usuariosAdmin': 'goUsuariosList',
    'click #nuevoUsuarioAdmin': 'goNuevoUsuarioAdmin',
    'click #pistasAdmin': 'goGestionAdmin',
    'click #estadisticasAdmin': 'goEstadisticasAdmin',
    'click #menu-boton-responsive': 'toggleMenu',
    'click ul li': 'currentClass',
    'click .admin #header.open': 'closeUp'
  },

  initialize: function () {
    var self = this;
    self.render();
    var isAdmin = self.getUserName().rol == 'admin';
    if(isAdmin === true) $('body').on('click', self.closeUp);

  },

  resetear: function () {
    this.$el.empty();
  },

  currentClass: function (element){
    var menu = $('#menu ul li').removeClass('current');
    $('#' + element.target.id).parent().addClass('current');
  },

  getUserName: function (){
    var sesion = Sesion.getInstance();
    var usuario = {};

    if (sesion.get('nombre') && sesion.get('apellidos')){
      usuario.nombre = sesion.get('nombre');
      usuario.apellidos = sesion.get('apellidos');
      usuario.rol = sesion.get('rol');
    }

    return usuario;
  },

  render: function () {
    var html = {};
    var usuario = this.getUserName();

    if (Number(usuario.rol) === 1) html = this.templateAdmin(usuario);
    else  html = this.template(usuario);

    this.$el.html(html);
    return this;
  },

  goHome: function (event) {
    event.preventDefault();
    Backbone.app.navigate("", { trigger: true });
  },

  logout: function (event) {
    event.preventDefault();

    Sesion.destroySesion();
    var sesion = Sesion.getInstance();
    Backbone.app.navigate("/login", { trigger: true });
  },

  goUserResume: function(event){
    event.preventDefault();
    Backbone.app.navigate("/perfil", { trigger: true });
  },

  goreservas: function (event) {
    event.preventDefault();
    Backbone.app.navigate("/reservas-usuarios", { trigger: true });
  },

  goMisResrvas: function (event) {
    event.preventDefault();
    Backbone.app.navigate("/misreservas", { trigger: true });
  },

  goNuevoUsuarioAdmin: function (event) {
    event.preventDefault();
    Backbone.app.navigate("/nuevo-usuario", { trigger: true });
  },

  goGestionAdmin: function(event){
    event.preventDefault();
    Backbone.app.navigate("/gestion", { trigger: true });
  },

  goEstadisticasAdmin: function (event) {
    event.preventDefault();
    Backbone.app.navigate("/estadisticas", { trigger: true });
  },

  goUsuariosList: function (event) {
    event.preventDefault();
    Backbone.app.navigate("/usuarios", { trigger: true });
    // Backbone.app.loadUsers();
  },

  toggleMenu: function (event) {
    if(event) event.preventDefault();
    var buttonTag = $("#menu-boton-responsive");
    this.$el.toggleClass( "open" );
    buttonTag.toggleClass( "open" );
  },

  closeUp: function(e){
    var self = this;
    var headerTag = $("#header");
    var menuTag = $("#special-back");
    var buttonTag = $("#botonMenuresponsive-wrapper");
    var buttonTagClass = $("#menu-boton-responsive");
    var status = headerTag.hasClass('open');
    //console.log('status',status)
    if (status === true){
      //console.log('statusINNN',status)
      if (!buttonTag.is(e.target) && buttonTag.has(e.target).length === 0){
        headerTag.removeClass('open');
        buttonTagClass.removeClass('open');
      }
    }

  },

  mostrar: function(){
    this.$el.show();
  },

  ocultar: function(){
    this.$el.hide();
  }

});