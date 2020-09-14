import { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

const fib = function (n) {
  return n === undefined
    ? 0
    : n === 0
    ? 0
    : n === 1
    ? 1
    : fib(n - 1) + fib(n - 2);
};

export const _Player = ({ type, route }) => {
  const location = useLocation();
  useEffect(() => {
    if (!route.includes(type)) {
      console.log("type and route mismatch", type, route, location.pathname);
    }
  });

  return `${type} ${route} ` + fib(30);
};

export const Player = connect((state) => ({
  route: state.router.location.pathname
}))(_Player);
