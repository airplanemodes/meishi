import React from 'react';

function Footer(props) {
    return (
      <footer className="container-fluid ubuntu pt-2 text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="fs-4 text-center">Created with <span className="iconify" data-icon="ant-design:heart-twotone" data-inline="false"></span> & <span className="iconify" data-icon="mdi:react" data-inline="false"></span></div>
            <small className="text-center mb-2">Copyright © {new Date().getFullYear()} Airplane Modes Network <span className="iconify" data-icon="ph:cube-duotone" data-inline="false"></span></small>
          </div>
        </div>
      </footer>
    );
}

export default Footer;