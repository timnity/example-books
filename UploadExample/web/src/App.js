import React from 'react';
import ReactDom from 'react-dom';

import Home from './Home';

const render = (Component) => {
  ReactDom.render(<Component />, document.getElementById('app-mount'));
};

render(Home);

// 热加载
if (module.hot) {
  module.hot.accept();
}
