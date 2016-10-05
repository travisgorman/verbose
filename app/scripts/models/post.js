import Backbone from 'backbone'
import settings from '../settings'

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
})

window.Post = Post
// let post = new Post()
export default Post