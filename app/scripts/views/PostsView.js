import $ from 'jquery'
import Backbone from 'backbone'
import PostItemView from './PostItemView';
import postsCollection from '../collections/posts';


const PostsView = Backbone.View.extend({
  initialize: function() {

    postsCollection.on('add', () => {
      console.log('I heard you added a new model:', this.cid)
      this.render()
    })
    postsCollection.fetch()
    console.log('PostsView this:', this )
  },

  className: 'posts-list',

  template: function() {
    return `
    <h2>Posts</h2>
    <ul></ul>
    `
  },

  render: function() {
    this.$el.html(this.template())
    postsCollection.forEach((post) => {
      let postItemView = new PostItemView({ model: post })
      postItemView.render()
      this.$('ul').prepend(postItemView.$el)
    }).then
    return this
  },

})
export default PostsView