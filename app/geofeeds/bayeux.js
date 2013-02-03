define([
  './base'
], function(BaseFeed) {

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

    initialize: function(){
      var url = this.get('url');
      var faye = window.faye; //FIXME require !!!
      var bayeux = new faye.Client(url);
      bayeux.subscribe('/faye', function(message){console.log(message.avatar.name);});
      this.bayeux = bayeux;
    }
  });
});
