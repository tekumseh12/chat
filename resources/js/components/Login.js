import React from 'react';
import axios from 'axios';


class Login extends React.Component{
  constructor(props){
    super(props)

  }

  render() {
    return (
      <div className="form">

        <form action="" method="post">

          <center>
          <input type="text" placeholder="username" name="username" onBlur={this.handleChange}></input>

          <input type="password" placeholder="password" name="password"  onBlur={this.handleChange}></input>
          <div>{this.props.tsid}</div>

          <input type="submit" value="log in"></input>

          <p>Quiz</p>
          </center>
        </form>

      </div>

    );

  }
}
export default Login;
