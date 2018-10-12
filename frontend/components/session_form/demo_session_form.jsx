import React from 'react';


class DemoSessionForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {username: "demouser", password: "starwars",session: this.props.session}
    this.handleSubmit = this.handleSubmit.bind(this);

  };

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user).then(this.props.closeModal);
  }

  updateUsername(e){
    this.setState({username: e.target.value})
  }

  updatePassword(e){
    this.setState({password: e.target.value})
  }

  renderErrors() {
    return(
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }


  render(){
    let headerMessage = ""
    let headerSubMessage = ""
    if (this.props.formType === 'signup') {
      headerMessage = 'Create your account'
      headerSubMessage = 'Registration is easy.'
    } else {
        headerMessage = 'Sign in as demo user'
    }

    return (

      <div>
        <form onSubmit={this.handleSubmit.bind(this)} className = "login-form-modal">
          <div onClick={this.props.closeModal} className="close-x"></div>

            <div className="modal-sign-in-container">

              <div className="modal-sign-in-h1">
                <div>{headerMessage}</div>
              </div>

              <div className="error-messages-container">
                <div className="error-messages"> {this.renderErrors()} </div>
              </div>

              <div>
                <label className="modal-email-address-title">Email address
                  <input  type="text"
                    value="demouser"
                    onChange={this.updateUsername.bind(this)}
                    className= "login-input"
                  />
                </label>
              </div>

              <div>
                <label className="modal-email-password-title">Password
                  <input  type="password"
                    value="starwars"
                    onChange={this.updatePassword.bind(this)}
                    className= "login-input"
                  />
                </label>
              </div>

              <div className="modal-button-action-container">
                <button className="session-submit btn" type="submit" value='Sign In'>
                  Sign in as demo user</button>
              </div>
            </div>
        </form>
      </div>

    )
  }

}

export default DemoSessionForm;
