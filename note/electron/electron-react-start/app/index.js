import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import Test from './components/test'

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

render(
  <AppContainer>
    <div>
      Hello world!!
      <Test/>
    </div>
  </AppContainer>,
  document.getElementById('root')
);
