define([
  './base',
  'models/feature'
], function(BaseFeed, Feature) {

  /**
   * Class: BayeuxFeed
   *
   * implemented using Faye - http://faye.jcoglan.com/
   *
   * Receives:
   *
   *   url - for channel where to subscribe
   *
   */
  return BaseFeed.extend({

    setup: function(){
      /**
       * Property: featureIndex
       *
       * keeps index of <Feature>s by uuid
       *
       * FIXME move this logic to <FeatureCollection>
       */
      this.featureIndex = {};

      var url = this.get('url');
      var faye = window.faye; //FIXME require !!!
      var bayeux = new faye.Client(url);
      bayeux.subscribe('/faye', this.onMessage.bind(this));
      this.bayeux = bayeux;

    },

    /**
     * Method: onMessage
     *
     * create a new or update existing feature based on uuid
     */
    onMessage: function(featureJson){
      var uuid = featureJson.uuid;
      if(!this.featureIndex[uuid]){
        var feature = new Feature(featureJson);
        this.featureIndex[uuid] = feature;
        this.collection.add(feature);
      } else {
        this.featureIndex[uuid].set(feature);
      }

      console.log(this.featureIndex);
    }
  });
});
