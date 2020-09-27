import React from 'react';
import './Breadcrumbs.scss';

function Breadcrumbs(props) {
    const {filters} = props;

    return (
      <ul className="breadcrumbs">
          {filters.map(item => (<li key={item.id}>{item.name} <i>></i></li>))}
      </ul>
    );
}

export default Breadcrumbs;