import $ from 'jquery'
import Backbone from 'backbone'
import settings from './settings'
import router from './router'
import session from './models/username'


$(document).ajaxSend( (e, xhr) => {
  if (localStorage.getItem('authtoken')) {
    debugger;
    xhr.setRequestHeader('Authorization', `Kinvey ${localStorage.getItem('authtoken')}`)
    session.set('username', localStorage.getItem('username'))
    session.set('authtoken', localStorage.getItem('authtoken')) 
  } 
  else {
    xhr.setRequestHeader('Authorization', `Basic ${settings.basicAuth}`)
  }
})

Backbone.history.start()
 