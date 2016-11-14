import React from 'react';
import 'whatwg-fetch';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


class Avatar extends React.Component{
  render() {
    return (
      <img src={this.props.url} />
    );
  }
}

class App extends React.Component {
	constructor() {
		super();
		this.state={rows:[]};
	}

	componentDidMount() {
		fetch(`https://api.github.com/users`)
		.then(result=>result.json())
		.then(rows=>this.setState({rows}));
	}

  avatarFormatter(cell, row){
    return <Avatar url={cell}/>;
  }

	render() {
		return (
      <BootstrapTable data={ this.state.rows }>
          <TableHeaderColumn dataField='avatar_url' dataFormat={this.avatarFormatter}>Avatar</TableHeaderColumn>
          <TableHeaderColumn dataField='id' isKey={ true }>User ID</TableHeaderColumn>
          <TableHeaderColumn dataField='login'>Login Name</TableHeaderColumn>
          <TableHeaderColumn dataField='type'>User Type</TableHeaderColumn>
      </BootstrapTable>
		);
	}
}

export default App;
