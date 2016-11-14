import React from 'react';
import 'whatwg-fetch';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Avatar from 'react-avatar';

class UserTable extends React.Component {

  constructor() {
    super();
    this.state={rows:[]};
    this.state.displayAdmins = true;
  }

  componentDidMount() {
    fetch(`https://api.github.com/users`)
    .then(result=>result.json())
    .then(rows=>this.setState({rows}));
  }

  avatarFormatter(cell, row){
    return (
      <a href={row.html_url}>
        <Avatar src={cell} round={true} name={row.login}/>
      </a>
    );
  }

  sortById(a, b, order){
    if (order === 'desc') {
      return a.id - b.id;
    } else {
      return b.id - a.id;
    }
  }

  filterSiteAdmins() {
    if(this.state.displayAdmins === true){
      this.refs.admin.applyFilter('true');
      this.state.displayAdmins = false;
    } else{
      this.refs.admin.applyFilter('');
      this.state.displayAdmins = true;
    }

  }

  render() {
    return (
      <div>
        <button className='btn btn-primary' onClick={this.filterSiteAdmins.bind(this)}>Include site admins</button>
        <BootstrapTable data={ this.state.rows } striped={false} hover={true}>
          <TableHeaderColumn dataField='avatar_url' dataFormat={this.avatarFormatter} isKey={true} dataSort={true} sortFunc={this.sortById} width='100'>Avatar</TableHeaderColumn>
          <TableHeaderColumn dataField='login' dataSort={true} width='140'>Login Name</TableHeaderColumn>
          <TableHeaderColumn dataField='type'>User Type</TableHeaderColumn>
          <TableHeaderColumn dataField='site_admin' ref='admin' filter={{type:'TextFilter', delay:1000}} hidden={true}>Site Admin</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }

}

export default UserTable;
