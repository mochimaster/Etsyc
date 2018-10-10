import React from 'react';


class SessionForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {username: "", password: ""}
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  updateUsername(e){
    this.setState({username: e.target.value})
  }

  updatePassword(e){
    this.setState({password: e.target.value})
  }


  render(){

    return (

      <div>
      <form onSubmit={this.handleSubmit.bind(this)} className = "login-form-box">
        Welcome to Craftsy
        <br/>
        Please {this.props.formType} or {this.props.navLink}

        <label>Username:
          <input type="text"
            value={this.state.username}
            onChange={this.updateUsername.bind(this)}
            className= "login-input"
          />
        </label>

        <label>Password:
          <input type="password"
            value={this.state.password}
            onChange={this.updatePassword.bind(this)}
            className= "login-input"
          />
        </label>

        <input className="session-submit" type="submit" value={this.props.formType} />
      </form>
    </div>

    )
  }

}

export default SessionForm;
