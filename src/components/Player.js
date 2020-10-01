import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

export const _Player = ({ type, route, trigger }) => {
    useEffect(() => {
        console.log('player render');
    });
    const location = useLocation();
    useEffect(() => {
        if (!route.includes(type)) {
            console.log(
                'type and route mismatch',
                type,
                route,
                location.pathname
            );
        }
    });

    return (
        <div
            onClick={() => {
                setTimeout(() => {
                    trigger();
                }, 0);
            }}
        >
            {type} {route}
        </div>
    );
};

export const Player = connect(
    (state) => {
        console.log('mapStateToProp executed');
        return {
            route: state.router.location.pathname,
            unstableProp: {},
        };
    },
    {
        trigger: () => ({ type: 'trigger' }),
    }
)(_Player);
