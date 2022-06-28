import React from 'react'
import ReactDOM from 'react-dom'


function Hello(props) {
    return <h1>Hello World!</h1>
}

const render = (Component) => {
    ReactDOM.render(<Component />, document.getElementById('app-mount'))
}

render(Hello)

// 热加载更新
if (module.hot) {
    module.hot.accept()
}
