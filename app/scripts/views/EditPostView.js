import $ from 'jquery'
import Backbone from 'backbone'
import router from '../router'
import session from '../models/username'
import PostItemView from './PostItemView'
import postsCollection from '../collections/posts'


const EditPostView = Backbone.View.extend({
  initialize: function(postId) {
    this.model = postsCollection.get(postId)
    console.log('this model:', this.model)
    let body = this.model.get('body')
    let title = this.model.get('title')
    let newBody = $('textarea').val()
    let newTitle = $('#newTitle').val()
    console.log('body:', body )
    console.log('title:', title )
    console.log('newBody:', newBody )
    console.log('newTitle:', newTitle )

  },

  className: 'edit-form',

  events: {
    'click input[type="submit"]' : 'editPost',
  },

  editPost: function(e) {
    e.preventDefault()
    // let body = this.model.get('body')
    // let title = this.model.get('title')
    let body = this.model.get('body')
    let title = this.model.get('title')
    let newBody = $('textarea').val()
    let newTitle = $('#newTitle').val()
    console.log('body:', body )
    console.log('title:', title )
    console.log('newBody:', newBody )
    console.log('newTitle:', newTitle )

    if (newBody) 
      body = newBody
    if (newTitle) 
      title = newTitle
    this.model.save({
      body: body,
      title: title,
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
    <h2> ${this.model.get('title')} </h2>
    <p> ${this.model.get('body')} </p>
    <form>
      <input type="text" 
        id="newTitle"
        class="new-post-title" 
        name="title" 
        placeholder="Title" />
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