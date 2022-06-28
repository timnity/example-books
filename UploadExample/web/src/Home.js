import React, { Component, Fragment } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <form action="http://localhost:8080/upload" method="post" encType="multipart/form-data">
          <h2>单图上传</h2>
          <input type="file" name="logo" multiple />
          <input type="submit" value="提交" />
        </form>
      </Fragment>
    );
  }
}

export default Home;
