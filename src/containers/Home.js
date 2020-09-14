import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getItemIDs } from "../actions";

class Home extends React.Component {
  componentDidMount() {
    this.props.getItemIDs();
  }

  render() {
    return (
      <ul>
        {this.props.itemIDs.map((id) => (
          <li key={id}>
            <Link to={id}>item {id}</Link>
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = (state, props) => {
  console.log(props.match, "home");
  return { itemIDs: state.itemIDs };
};

const mapDispatchToProps = {
  getItemIDs
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
