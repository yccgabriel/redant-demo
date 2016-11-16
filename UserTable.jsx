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

  userControlButtons(cell, row){
    var buttonStyle = {
      paddingLeft: 15,
      paddingRight: 15,
      marginLeft: 2,
      marginRight: 2
    };

    return (
      <div className="hidden-sm hidden-xs">
        <button className="btn btn-primary" style={buttonStyle}>
          <span className="glyphicon glyphicon-eye-open"></span>
          <div>View</div>
        </button>
        <button className="btn btn-warning" style={buttonStyle}>
          <span className="glyphicon glyphicon-lock"></span>
          <div>Block</div>
        </button>
        <button className="btn btn-danger" style={buttonStyle}>
          <span className="glyphicon glyphicon-remove"></span>
          <div>Block</div>
        </button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <BootstrapTable data={ this.state.rows } striped={false} hover={true} className="table-striped">
          <TableHeaderColumn dataField='avatar_url' dataFormat={this.avatarFormatter} isKey={true} dataSort={true} sortFunc={this.sortById}>ID</TableHeaderColumn>
          <TableHeaderColumn dataField='login' dataSort={true}>Login Name</TableHeaderColumn>
          <TableHeaderColumn dataField='type'>User Type</TableHeaderColumn>
          <TableHeaderColumn dataField='site_admin' ref='admin' filter={{type:'CustomFilter', getElement: this.getCustomFilter, customFilterParameters: { textOK: 'only' }}} dataFormat={this.siteAdminFormatter}>Admin</TableHeaderColumn>
          <TableHeaderColumn dataFormat={this.userControlButtons} className="hidden-sm hidden-xs" columnClassName="hidden-sm hidden-xs"></TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }

}

export default UserTable;
