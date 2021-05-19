
import React, {createRef} from 'react';

class Portal extends React.Component {
  constructor(props){
    super(props);


  }
  render(){
    return (
      <div>
        <h1>Portal</h1>
        {this.props.tsid}
      </div>
    )
  }
}



export default Portal
