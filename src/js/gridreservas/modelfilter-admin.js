var Backbone   = require('backbone'),
    _          = require('underscore'),
    $          = require('jquery');

module.exports = Backbone.Model.extend({
    defaults: {
        what: '',
        where: 'all'
    },
    initialize: function(opts) {
        this.collection = opts.collection;
        this.filtered = new Backbone.Collection(opts.collection.models);
        this.on('change:what change:where', this.filter);
    },
    filter: function() {
        var what = this.get('what').trim().toLowerCase(),
            where = this.get('where'),
            lookin = (where==='all') ? ['mail', 'nombre_deporte', 'nombre_pista', 'fecha_pista', 'inicio', 'precio_pista', 'precio_luz', 'anulado','luz'] : where,
            models;

        if (what==='') {
            models = this.collection.models;
        } else {
            models = this.collection.filter(function(model) {
                return _.some(_.values(model.pick(lookin)), function(value) {
                    return ~value.toLowerCase().indexOf(what);
                });
            });
        }

        this.filtered.reset(models);
    }
});