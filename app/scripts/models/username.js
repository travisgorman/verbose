import Backbone from 'backbone'
import $ from 'jquery'
import settings from '../settings'
import router from '../router'

const Session = Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/user/${settings.appKey}/`,
  defaults: {
    // username: '',
    // authtoken: '',
  },
  parse: function(response) {
    if (response) {
      return {
        authtoken: response._kmd.authtoken,
        username: response.username,
        userId: response._id
      }
    }
  },
  login: function(username, password) {
    this.save({ 
      username: username, 
      password: password 
    }, {
      url: `https://baas.kinvey.com/user/${settings.appKey}/login`,
      success: (model, response) => { 
        this.unset('password')
        // this.set('username', response.username)
        // this.set('authtoken', response._kmd.authtoken)
        window.localStorage.setItem('authtoken', response._kmd.authtoken)
        window.localStorage.setItem('username', response.username)
        router.navigate('posts', { trigger: true })
      },
      error: function(response) {
        console.log('Error:', response )
      }
    })
  },
  signup: function(username, password) {
    this.save({
      username: username,
      password: password,
    }, {
      url: `https://baas.kinvey.com/user/${settings.appKey}`,
      type: 'POST',
      success: (model, response) => {
        localStorage.removeItem('authtoken');
        window.localStorage.setItem('authtoken', response._kmd.authtoken)
        window.localStorage.setItem('username', response.username)
        this.set('username', localStorage.getItem('username'))
        console.log('SUCCESS: you created a new user', model, response )
        router.navigate('posts', {trigger: true})
      },
      error: function(model, response) {
        console.log('ERROR something went wrong with signup:', model, response )
      },
    })
  },  
  retrieve: function(){
    this.fetch({
      url: `https://baas.kinvey.com/user/${settings.appKey}/_me`,
    })
  },
 })

 let session = new Session()
 export default session