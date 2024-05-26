import React from 'react';
import LoadingBar from 'react-redux-loading-bar';
import './BaseLoadingBar.styles.scss';

export function BaseLoadingBar() {
  return (
    <div className="base-loading-bar">
      <LoadingBar />
    </div>
  );
}
