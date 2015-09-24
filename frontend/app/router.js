import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('rooms', { path: "/rooms" }, function() {
    this.route('room', { path: "/:room_id" }, function() {
      this.route('messages', { path: "/messages" });
    });
  });
});

export default Router;
