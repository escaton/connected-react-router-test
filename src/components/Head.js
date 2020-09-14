import React from "react";
import { useHistory } from "react-router-dom";
import { unstable_batchedUpdates } from "react-dom";
// import { NavLink } from "react-router-dom";

const NavLink = (props) => {
  const history = useHistory();
  return (
    <a
      href={props.to}
      onClick={(e) => {
        e.preventDefault();
        setTimeout(() => {
          unstable_batchedUpdates(() => {
            history.push(props.to);
          });
        }, 0);
      }}
    >
      {props.children}
    </a>
  );
};

export const Head = () => {
  return (
    <ul>
      <li>
        <NavLink to="/">/</NavLink>
      </li>
      <li>
        <NavLink to="/film/film1">/film/film1</NavLink>
      </li>
      <li>
        <NavLink to="/trailer/trailer1">/trailer/trailer1</NavLink>
      </li>
    </ul>
  );
};
