import React, { Component } from 'react';
import QRCode from 'qrcode'

class QRCodeComponent extends Component {
  render() {
    return (
      <canvas ref={c => QRCode.toCanvas(c, this.props.data, (e) => {console.error(e)})} />
    )
  }
}

export default QRCodeComponent;
