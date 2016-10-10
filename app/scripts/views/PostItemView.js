import Backbone from 'backbone'
import $ from 'jquery'
import moment from 'moment'
import session from '../models/username'
import router from '../router'
import post from '../models/post'

const PostItemView = Backbone.View.extend({

  tagName: 'li',
  className: 'post-list-item',

  template: function() {
    let options
    let author = this.model.get('author')
    let user = localStorage.getItem('username')

    if (author === user)
      options = `
        <input type="button" id="editBtn" value="edit"/>
        <input type="button" id="deleteBtn" value="delete"/>
        <input type="button" id="idBtn" value="id"/>
      `
    else 
      options = ''

    return `
      <h3 class="post-list-title">
        <a href="#posts/${this.model.get('_id')}">
          ${this.model.get('title')}
        </a>
      </h3>
      <span class="author">
        ${this.model.get('author')}
      </span>
      <time class="timestamp">
        ${moment(new Date(this.model.get('timestamp'))).fromNow()}
      </time>
      ${options}
    `
  },

  render: function() {
    this.$el.html(this.template())
  },

  events: {
    'click #editBtn'   : 'editFunction',
    'click #deleteBtn' : 'deleteFunction',
    'click #idBtn'     : 'idFunction',
  },

  editFunction: function(e) {
    console.log('item edit event:', e )
    // let editBox =  `
    // <textarea id=postEdit></textarea>
    // <input type="submit" value="change"/>
    // `
    // let edit
    router.navigate(`post-form/${this.model.get('_id')}`, {trigger: true})
  },
  deleteFunction: function(e) {
    console.log('item delete event:', e )
    this.model.destroy()
  },

  idFunction: function(e) {
    e.preventDefault()
    let model = this.model
    let acl = this.model.get('_acl')
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

export default PostItemView