import Backbone from 'backbone'
import session from '../models/username'
import $ from 'jquery'

const Nav = Backbone.View.extend({
  initialize: function() {
    console.log('nav this:', this )
    console.log('session-username:', session.get('username') )
    console.log('session:', session )
  },
  tagName: 'nav',
  className: 'header-nav',
  template: function() {
    return `
        <a href="#post-form">Make a New Post</a>
        <a href="#posts">See all Posts</a>
        <a href="#logout">Logout</a>
    `
  },
  render: function() {
    this.$el.html(this.template)
    return this
  }
})

export default Nav