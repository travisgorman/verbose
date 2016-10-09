import $ from 'jquery'
import Backbone from 'backbone'
import settings from './settings'
import session from './models/username'
import postsCollection from './collections/posts'
import PostForm from './views/PostFormView'
import LoginView from './views/LoginView'
import SignupView from './views/SignupView'
import Nav from './views/Nav'
import PostsView from './views/PostsView'
import PostDetailView from './views/PostDetailView'

const Router = Backbone.Router.extend({
  routes: {
    login        : 'loginF',
    signup       : 'signupF',
    logout       : 'logoutF',
    posts        : 'postsF',
    'posts/:id'  : 'postF',
    'post-form'  : 'newPostF',
    '/*'         : 'loginF',
  },

  loginF() {
    if (!session.get('username')) {
      if (localStorage.getItem('authtoken')) {
        session.retrieve()
        this.navigate('posts', {trigger: true})
      } 
      else {
        let login = new LoginView()
        $('#page').empty()
          .append(login.render().$el)
      }
    }
  },

  signupF() {
    let signup = new SignupView()
    $('#page').empty()
      .append(signup.render().$el)
  },

  logoutF() {
    session.save(null, {
      url: `https://baas.kinvey.com/user/${settings.appKey}/_logout`,
      success: () => {
        window.localStorage.clear()
        session.clear()
        console.log('You are LOGGED OUT:', session )
        this.navigate('login', { trigger: true })
      }
    })
  },

  postsF() {
    let postsView = new PostsView()
    let nav = new Nav()
    $('#page').empty()
      .append(nav.render().$el)
        .append(postsView.render().$el)
  },

  postF(postId) {
    // postsCollection.off()
    postsCollection.off()
    let postDetailView = new PostDetailView(postId)
    let postsView = new PostsView()
    let nav = new Nav()

    $('#page').empty()
      .append(nav.render().$el)
        // .append(postsView.render().$el)
          .append(postDetailView.render().$el)
  },

  newPostF() {
    let nav = new Nav()
    let postForm = new PostForm()
 
    $('#page').empty()
      .append(nav.render().$el)
        .append(postForm.render().$el)
  },

})

const router = new Router()
export default router
