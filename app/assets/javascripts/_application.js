// Root page for all my dom stuff
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    render() {
        return <h1>Test</h1>;
    }
}

ReactDOM.render(<App/>, document.getElementById('main'));
