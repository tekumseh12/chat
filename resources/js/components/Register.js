import React, {useRef} from 'react';
import './login.css';
import axios from 'axios';
class Register extends React.Component{
  constructor(props){
    super(props);

    this.state = {username:"", password:"", repeat:"",email:"", errorUser:"", errorPass:"", errorRep:"", errorEmail:""};
    this.handleChange = this.handleChange.bind(this);
    this.errors=[]
    this.Submit = this.Submit.bind(this);


  }

  handleChange(e){
    const {name, value} = e.target;
    this.setState({[name]: value});
  }
  passVal(){

    let txt = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let txt1=true
    let num1=true
    let num = "1234567890"
    for (let i = 0;i<txt.length;i++){
      if (this.state.password.indexOf(txt[i]) != -1){

        txt1=false
        break;
      }
    }
    for (let i = 0;i<num.length;i++){
      if (this.state.password.indexOf(num[i]) != -1){
        num1 = false

        break;
      }
    }

    if (num1 || txt1 || this.state.password.length<8){

      this.setState({errorPass:"the password has to contain atleast one upper-case and one number and 8 characters long"});
    }else{
      this.setState({errorPass:""});
    }
    if (this.state.password != this.state.repeat){
      this.setState({errorRep:"the password aren't the same"})
    }else{
      this.setState({errorRep:""})
    }


  }
  Submit(){
    let promise = new Promise((success, fail)=>{
      this.passVal();
      this.userVal();
      this.emailVal();
      success("ok")
    }).then(async (res)=>{


      this.errors = []
      for (let i= 4;i<Object.values(this.state).length;i++) {
        this.errors.push(Object.values(this.state)[i])
      }

      this.forceUpdate()
      // this.setState({errorUser:this.state.errorUser})
      // if (!this.state.errorUser && !this.state.errorEmail && !this.state.errorPass && !this.state.errorRep){


      let url = "/register?username="+this.state.username+"&password="+this.state.password+"&email="+this.state.email;
      // fetch(url, {
      //   method:'post',
      //   header:{
      //
      //   }
      // }).then(src=>src.text()).then(src=>(JSON.parse(src).correct) ? this.form.current.submit():setState({errorEmail:JSON.parse(src).errors}))
      const {data} = await axios.post(url, {username:this.state.username, password:this.state.password, email:this.state.email});
      console.log(data)
      const result = (data.correct) ? window.location.assign("portal"):this.setState({errorEmail:data.errors});
      // }
  })
  }
  userVal(){

    if (this.state.username.length < 5){
      this.setState({errorUser:"username has to have at least 5 characters"})
    }else{
      this.setState({errorUser:""})
    }
  }
  emailVal(){
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    var test = pattern.test(this.state.email)

    if (!test){
      this.setState({errorEmail:"email is not valid"});
    }else{
      this.setState({errorEmail:""});
    }
// {Object.values(this.state).map((val,i) =><div key={i.toString()}>{val}</div>)
  }
  render() {
    return (
        <div className="form">

          <form>

            <center>

            <input type="text" placeholder="username" name="username" onBlur={this.handleChange}></input>
            <div>{this.errors[0]}</div>
            <input type="password" placeholder="password" name="password"  onBlur={this.handleChange}></input>
            <div>{this.errors[1]}</div>
            <input type="password" placeholder="repeat" name="repeat" onBlur={this.handleChange}></input>
            <div>{this.errors[2]}</div>
            <input type="email" placeholder="email" name="email" onBlur={this.handleChange}></input>
            <div>{this.errors[3]}</div>
            <input type="button" onClick={()=>this.Submit()}value="Sign in"></input>

            <p>Quiz</p>
            </center>
          </form>

        </div>

    );
  }
}

export default Register;
