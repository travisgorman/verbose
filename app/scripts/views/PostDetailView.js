import Backbone from 'backbone'
import $ from 'jquery'
import postsCollection from '../collections/posts'
import moment from 'moment'
import router from '../router'


const PostDetailView = Backbone.View.extend({

  initialize: function(postId) {
    console.log('detailV this:', this )
    // session.retrieve()
    this.model = postsCollection.get(postId);
    this.model.on('change', (model) => this.render())

    console.log('this.model:', this.model.get('_id') )
  },

  tagName: 'article',
  className: 'post-detail',

  template: function() {
    let options
    let author = this.model.get('author')
    let user = localStorage.getItem('username')
    if (author === user) {
      options = `
        <input type="button" id="editBtn" value="edit"/>
        <input type="button" id="deleteBtn" value="delete"/>
        <input type="button" id="idBtn" value="id"/> 
      `
    }
    else {
      options = ''
    }
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
    ${options}
    `
  },

  render: function() {
    this.$el.html(this.template())
    return this
  },

  events: {
    'click .like'      : 'like',
    'click #editBtn'   : 'editFunction',
    'click #deleteBtn' : 'deleteFunction',
    'click #idBtn'     : 'idFunction',
  },

  like: function() {
    this.model.like()
  },

  editFunction: function(e) {
    console.log('item edit event:', e )
  },

  deleteFunction: function(e) {
    console.log('item delete event:', e )
    this.model.destroy()
  },
  idFunction: function(e) {
    e.preventDefault()
    // let model = this.model
    // let acl = this.model.get('_acl')
    // console.log('my userId:', session.get('userId') )
    // console.log('acl.creator:', acl.creator )
    console.log('this.model:', model.get('_id'))
    console.log('this.model:', this.model)
    console.log('edit post number:', this.model.get('_id'))
    
    router.navigate(`post-form/${this.model.get('_id')}`, {trigger: true})

    // this.save({

    // })
  }

})

export default PostDetailView
