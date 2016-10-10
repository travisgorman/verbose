import $ from 'jquery'
import Backbone from 'backbone'
import router from '../router'
import session from '../models/username'
import PostItemView from './PostItemView'
import postsCollection from '../collections/posts'


const EditPostView = Backbone.View.extend({
  initialize: function() {

    console.log('postForm session:', session)
    console.log('postForm session:', session.get('username') )
    console.log('postForm session JSON:', JSON.stringify(session.get('username')))
  },

  className: 'edit-form',

  events: {
    'click input[type="submit"]' : 'editPost',
  },

  editPost: function(e) {
    e.preventDefault()
    let body = this.model.get('body')
    let title = this.model.get('title')

    this.model.save({
      body: $('textarea').val()
    }, {
      success: function(response) {
        router.navigate('posts', {trigger: true})
      },
      error: function(response) {
        console.log('ERROR:', response )
      }
    })
  },

  template: function() {
    return `
    <h2>Edit Post</h2>${this.model.get('_id')}
    <form>
      <input type="text" name="title" class="new-post-title" placeholder="Title"/>
      <textarea name="body" placeholder="Change the message"></textarea>
      <input type="submit" name="submit" value="submit"/>
    </form>
    `
  },

  render: function() {
    this.$el.html(this.template())
    return this
  },

})

export default EditPostView