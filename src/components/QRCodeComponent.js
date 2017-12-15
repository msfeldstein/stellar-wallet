import React, { Component } from 'react';
import QRCode from 'qrcode'

class QRCodeComponent extends Component {
  render() {
  	if (!this.props.data) return null
    return (
      <canvas ref={c => c && QRCode.toCanvas(c, this.props.data, (e) => {if (e) console.error(e)})} />
    )
  }
}

export default QRCodeComponent;
