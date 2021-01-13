import React from 'react';
import icons from '../../static/icons/sprites.svg';

const Icon = ({ className, icon, size, onClick, style }) => {
  const remSize = `${size}rem`;

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      onClick={onClick}
      style={{
        ...style,
        width: remSize,
        height: remSize,
        minWidth: remSize,
        minHeight: remSize,
      }}
    >
      <use xlinkHref={`${icons}#icon-${icon}`} />
    </svg>
  )
};


Icon.defaultProps = {
  className: '',
  onClick: () => {},
  style: {},
};

export default Icon;
