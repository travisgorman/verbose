import Backbone from 'backbone'
import $ from 'jquery'
import session from '../models/username';
import settings from '../settings'

const SignupView = Backbone.View.extend({
  className: 'signup-form',
  events: {
    'submit' : 'signupFunction'
  },
  submitFunction: function(e) {
    let username = this.$('#username').val()
    let password = this.$('#password').val()
    var encrypted = `${settings.basicAuth}`
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: `https://baas.kinvey.com/user/${settings.appKey}/`,
      data: JSON.stringify({ username: username, password: password }),
      headers: { Authorization : `Basic ${encrypted}` },
      contentType: 'application/json',
      success: function(response) {
        user.username = username
        user.authtoken = response._kmd.authtoken
        location.hash = '#posts'
        console.log('SUCCESS you created a user', response)
      },
      error: function(response) {
        console.log( 'ERROR', response )
      }
    })
  },
  template: function() {
    return `
    <form>
      <h2>Sign Up</h2>
      <input id="username" 
        type="text" 
        name="username" 
        placeholder="username"/>
      <input id="password" 
        type="password" 
        name="password" 
        placeholder="password" />
      <input type="submit"
        id="signupBtn"
        name="signupBtn" 
        value="sign up">
      <p>Already a member? 
        <a href="#login"> 
          Log in 
        </a>
      </p>
    </form>
    `
  },
  render: function() {
    this.$el.html(this.template())
    return this
  },
})
export default SignupView
