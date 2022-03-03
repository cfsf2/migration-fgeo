import { render } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import CapturaWs from './CapturaWs';

export default function SwitchComportamiento({ codigo, campana }, props) {
  switch (codigo) {
    case 'captura_ws':
      return <CapturaWs campana={campana} />;

    case 'nada':
      return null;
    default:
      break;
  }

  return;
}
