// React core
import React, { Component } from 'react'

// Local components
import TroopsViewer from './TroopsViewer'

/*
**  Main app component
*/

class App extends Component {

  // Main render
  render() {
    return <div id="App">
      <TroopsViewer/>
    </div>
  }
}

export default App
