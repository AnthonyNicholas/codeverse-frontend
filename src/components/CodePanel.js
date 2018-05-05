import React, { Component } from 'react';
import { Flex, Box } from 'reflexbox';
import UserImage from '../images/codeverse-gandalf.gif';
import '../css/CodePanel.css'

//Code Editor
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

import Firebase from '../Firebase.js';


import Confetti from 'react-dom-confetti';

const options = [
  { value: 'javascript', label: 'JavaScript' },
]

const defaultOption = options[0]


class CodePanel extends Component {

  constructor(props) {
    super()
    this.props = props
    this.state = {testStatus: "Not Run"}
    this.fbListener = new Firebase('testcode2')

    this.confettiConfig = {
  angle: 90,
  spread: 45,
  startVelocity: 45,
  elementCount: 50,
  decay: 0.9
};


    if(!this.props.isCurrentUser) {
      this.updateCalled = this.updateCalled.bind(this);
      this.fbListener.codeListen(this.updateCalled)
    }
  }

  updateCalled(updateText) {
    console.log("Updating text to"+updateText)
    this.setState( (state) => {
        state.theirText = updateText;
        return state;
    });
  }

  getTopBox(props) {
    if(this.props.isCurrentUser) {
      return(
        <div className="session-user-info">

      <Flex  p={2} align='center'>

      <Box w={1/3}>
      <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Language" />
      </Box>
      <Box w={1/3} >

      </Box>
      <Box w={1/3} >
      <button onClick={() => {this.props.notify("Running Tests 😀")}} className="btn-join">Run > </button>
      <Confetti active={ this.isCompleted } config={ this.confettiConfig }/>
      </Box>

      </Flex>


      </div>)
    } else  {
      return(<div className="session-user-info">


      <Flex  p={1} align='center'>

      <Box w={1/6}>
      <img className="avatar" src={UserImage} alt="User" height="50vh"/>
      </Box>
      <Box w={2/3} >
        <a className="btn-join">Gandalf Whizard</a>
      </Box>


      </Flex>


      </div>)
    }
  }

  onChange() {
    // Here we probably want to call Firebase


  }

  render() {
    return(
      <div className="stats-box">

        {this.getTopBox()}

        <Confetti active={ this.props.completed } />
        <AceEditor
          width="100%"
          height="40vh"
          readOnly={!this.props.isCurrentUser}
          mode="javascript"
          theme="monokai"
          name="blah2"
          onLoad={this.onLoad}
          onChange={this.props.onChange}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={this.state.theirText}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />



        <div className="session-testcases-info">

          <Flex align='center'>

          <Box w={1/3}>
            Executed in 11ms
          </Box>
          <Box w={1/3} className={"testcase-result-"+this.state.testStatus}>
            {this.state.testStatus}
          </Box>
          <Box w={1/3} className="submitArea">

            <button className="btn-join" onClick={() => {this.props.notify("Submitted")}} hidden={!this.props.isCurrentUser}>Submit</button>
          </Box>

          </Flex>



        </div>
      </div>
    )
  }

}


export default CodePanel;
