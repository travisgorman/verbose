import Backbone from 'backbone';
import $ from 'jquery';
import postsCollection from '../collections/posts';
import router from '../router';
import user from '../models/username';

const PostForm = Backbone.View.extend({
  className: 'post-form',
  events: {
    'click input[type="submit"]' : 'newPost',
  },
  newPost: function(e) {
    e.preventDefault()
    postsCollection.create({
      author: user.username,
      title: $('.new-post-title').val(),
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
  render: function() {
    return `
    <h2>Write a new Post</h2>
    <form>
      <input type="text" name="title" class="new-post-title" placeholder="Title"/>
      <textarea name="body" placeholder="write something here"></textarea>
      <input type="submit" name="submit" value="submit"/>
    </form>
    `
  }
})
 export default PostForm