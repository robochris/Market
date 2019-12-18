import React from 'react';
import Toolbar from './toolbar'
class Home extends React.Component {
constructor(props){
  super(props);
  this.state={
    penis: "penis"
  }
 }
render() {
    return (
      <div>
          <Toolbar setRouter={this.props.setRouter} />
          Home
      </div>
    );
  }
}
export default Home;
