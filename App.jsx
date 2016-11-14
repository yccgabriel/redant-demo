import React from 'react';
import 'whatwg-fetch';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const products = [];

function addProducts(quantity) {
  const startId = products.length;
  for (let i = 0; i < quantity; i++) {
    const id = startId + i;
    products.push({
      id: id,
      name: 'Item name ' + id,
      price: 2100 + i
    });
  }
}

addProducts(5);

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

	render() {
		return (
      <BootstrapTable data={ this.state.rows }>
          <TableHeaderColumn dataField='id' isKey={ true }>User ID</TableHeaderColumn>
          <TableHeaderColumn dataField='login'>Login Name</TableHeaderColumn>
          <TableHeaderColumn dataField='type'>User Type</TableHeaderColumn>
      </BootstrapTable>
		);
	}
}

export default App;
