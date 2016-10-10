import Backbone from 'backbone'
import settings from '../settings'
import router from '../router'
import session from './username'

const Post = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: `https://baas.kinvey.com/appdata/${settings.appKey}/posts`,
  defaults : {
    timestamp: new Date(),
    likes: 0,
  },
  like: function() {
    var newLikes = this.get('likes') + 1
    this.set('likes', newLikes)
    this.save()
  },
  
  edit: function() {
    this.save({
    type: 'PUT',
    url: `https://baas.kinvey.com/user/${settings.appKey}/${this.model.get('_id')}`,
    contentType: 'application/json',
    data: {
      body: 'go back to the first question',
      title: 'deplorables'
    }, 
    })
  },
})

window.Post = Post
// let post = new Post()
export default Post