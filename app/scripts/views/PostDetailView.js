import Backbone from 'backbone'
import $ from 'jquery'
import postsCollection from '../collections/posts';


const PostDetailView = Backbone.View.extend({

  initialize: function(postId) {
    console.log('detailV this:', this )

    this.model = postsCollection.get(postId);
    this.model.on('change', (model) => this.render())

    console.log('this.model:', this.model )
  },

  tagName: 'article',
  className: 'post-detail',

  template: function() {
    console.log('template this:', this )
    console.log('template this.model:', this.model )
    return `
    <h2> ${this.model.get('title')} </h2>
    <div class="post-meta-data">
      <span class="likes">
        ${this.model.get('likes')} likes
      </span>
      <input type="button" class="like" value="like"/>
      <span class="article-author">
        ${this.model.get('author')}
      </span>
      <time class="article-timestamp">
        ${this.model.get('timestamp')}
      </time>
    </div>
    <p> ${this.model.get('body')} </p>
    `
  },

  render: function() {
    this.$el.html(this.template())
    return this
  },

  events: {
    'click .like' : 'like'
  },

  like: function() {
    this.model.like()
  }
})

export default PostDetailView
