define(['ender', './dspace', './config'], function($, DSpace, config) {

  /**
   * BIG BANG!
   */
  $.domReady(function () {

    /**
     * create pubsub client
     * FIXME !!!
     */
    window.faye = Faye;

    window.dspace = new DSpace(config);
    window.world = dspace.world;
  });

});
