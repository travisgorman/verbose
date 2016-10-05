import Backbone from 'backbone';
import $ from 'jquery'
import session from '../models/username';
import router from '../router';

const LoginView = Backbone.View.extend({
  className: 'login-form',
  events: {
    'submit' : 'submitFunction'
  },
  submitFunction: function(e) {
    let username = $('#username').val()
    let password = $('#password').val()
    e.preventDefault()
    session.login(username, password)
  },
  template: function() {
    return `
    <form>
      <h2>Login</h2>
      <input id="username" 
        type="text" 
        name="username" 
        placeholder="username"/>
      <input id="password" 
        type="password" 
        name="password" 
        placeholder="password"/>
      <input type="submit" 
        name="submit"
        id="loginBtn"
        value="submit">
      <p>Not a member yet? <a href="#signup">Sign up</a></p>
    </form>
    `
  },
  render: function() {
    this.$el.html(this.template())
    return this
  },
})
export default LoginView