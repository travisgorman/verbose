import Backbone from 'backbone'
import $ from 'jquery'
import session from '../models/username';
import settings from '../settings'

const SignupView = Backbone.View.extend({

  className: 'signup-form',

  events: {
    'submit' : 'signupFunction'
  },

  signupFunction: function(e) {
    e.preventDefault()
    let username = this.$('#username').val()
    let password = this.$('#password').val()
    session.signup(username, password)
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
