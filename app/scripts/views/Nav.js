import Backbone from 'backbone'
import $ from 'jquery'

const Nav = Backbone.View.extend({
  initialize: function() {
    console.log('nav this:', this )
  },
  tagName: 'nav',
  className: 'header-nav',
  template: function() {
    return `
        <a href="#posts/new">Make a New Post</a>
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