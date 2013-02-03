define([
  'underscore',
  'backbone',
  'collections/feature'
], function(_, Backbone, FeatureCollection) {


  /**
   * Class: GeoFeeds.Base
   *
   */

  var Base = Backbone.Model.extend({

    initialize: function(options) {
      this.collection = new FeatureCollection();
      _.extend(this, options);
      this.title = this.makeTitle();

      this.collection.on('add', function() {
        this.trigger('change', this);
      }.bind(this));

      /**
       * run setup in case subclases define one
       */
      if(this.setup){this.setup();}
    },

    updateCollection: function(collection, reset) {
      if(reset) {
        this.collection.reset([]);
      }
      this.collection.update(collection.features);
    },

    makeTitle: function() {
      return this.name;
    }

  });

  return Base;

});
