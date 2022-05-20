import React from 'react';

import HeaderStyles from './styles/HeaderStyles';

export default function Header() {
  return (
    <HeaderStyles>
      <div className="logo">
        <h1>Click To Buy</h1>
      </div>
      <div className="nav">
        <h4>Nav</h4>
      </div>
      <div className="icons">
        <h5>Icons</h5>
      </div>
    </HeaderStyles>
  );
}
