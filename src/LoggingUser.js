import React from 'react';
import Toolbar from './toolbar';
class LoggingUser extends React.Component {
constructor(props){
  super(props);
  this.state={
  username:'',
  password:''
  }
}
handleClick(event) {
  alert("penis");
}
render() {
    return (
      <div>
          <Toolbar setRouter={this.props.setRouter} />
          <div>
              ficking penis ass bitch
              <div>
               <input
                 onChange = {(event,newValue) => this.setState({username:newValue})}
                 />
               <br/>
                 <input
                   type="password"
                   onChange = {(event,newValue) => this.setState({password:newValue})}
                   />
                 <br/>
                 <button onClick={(event) => this.handleClick(event)}>Submit</button>
             </div>
          </div>
      </div>
    );
  }
}

export default LoggingUser;
