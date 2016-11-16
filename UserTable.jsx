import React from 'react';
import 'whatwg-fetch';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Avatar from 'react-avatar';

class CheckboxFilter extends React.Component {
  constructor(props) {
    super(props);
    this.filter = this.filter.bind(this);
    this.isFiltered = this.isFiltered.bind(this);
  }

  filter(event) {
    if (!this.refs.okCheckbox.checked) {
      // all checkboxes are checked means we want to remove the filter for this column
      this.props.filterHandler();
    } else {
      this.props.filterHandler({ callback: this.isFiltered });
    }
  }

  isFiltered(targetValue) {
    if (targetValue === true) {
      return (this.refs.okCheckbox.checked);
    }
  }

  render() {
    return (
      <div>
        <input ref='okCheckbox' type='checkbox' className='filter' onChange={ this.filter } defaultChecked={ false } /><label>{ this.props.textOK }</label>
      </div>
    );
  }
}

CheckboxFilter.propTypes = {
  filterHandler: React.PropTypes.func.isRequired,
  textOK: React.PropTypes.string
};

CheckboxFilter.defaultProps = {
  textOK: 'true',
};

class UserTable extends React.Component {

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
    return (
      <a href={row.html_url}>
        <Avatar src={cell} round={true} name={row.login} size="50"/>
      </a>
    );
  }

  siteAdminFormatter(cell, row){
    if(cell === true){
      return <span className="glyphicon glyphicon-ok"></span> ;
    }
    else {
      return <span className="glyphicon glyphicon-remove"></span> ;
    }
  }

  sortById(a, b, order){
    if (order === 'desc') {
      return a.id - b.id;
    } else {
      return b.id - a.id;
    }
  }

  getCustomFilter(filterHandler, customFilterParameters) {
    return (
      <CheckboxFilter filterHandler={ filterHandler } textOK={ customFilterParameters.textOK } />
    );
  }

  render() {
    return (
      <div>
        <BootstrapTable data={ this.state.rows } striped={false} hover={true}>
          <TableHeaderColumn dataField='avatar_url' dataFormat={this.avatarFormatter} isKey={true} dataSort={true} sortFunc={this.sortById} width='50'>ID</TableHeaderColumn>
          <TableHeaderColumn dataField='login' dataSort={true} width='140'>Login Name</TableHeaderColumn>
          <TableHeaderColumn dataField='type'>User Type</TableHeaderColumn>
          <TableHeaderColumn dataField='site_admin' ref='admin' filter={{type:'CustomFilter', getElement: this.getCustomFilter, customFilterParameters: { textOK: 'yes' }}} dataFormat={this.siteAdminFormatter}>Only Site Admins</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }

}

export default UserTable;
