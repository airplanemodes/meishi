import React from 'react';
import '../css/card.css';

function Cardlist(props) {
    return (
      <div className="row">
        {props.prop.map(item => {
          // ?. means optional property
          let bg = item.bsnImageUrl?.length > 2 ? item.bsnImageUrl : '/images/default.jpg'
          return (
            <div className="col-lg-4 p-3">
              <article className="border border-dark" style={{backgroundColor:"#222"}}>
                <h3 className="text-white text-center p-1" style={{backgroundColor:"#333"}}>{item.bsnName}</h3>
                <div className="meishiImage" style={{backgroundImage:`url(${bg})`}}></div>
                <div className="small mt-1 text-center" style={{backgroundColor:"#333", color:"#c7c7c7"}}>{item.bsnDescription}</div>
                <div className="small mt-1 text-center text-white" style={{backgroundColor:"#333"}}><span className="iconify" data-icon="mdi:phone" data-inline="false"></span> {item.bsnPhone} - {item.bsnAddress}</div>            
              </article>
            </div>
          )
        })}
      </div>

        // <div className="card" style={{width: "18rem"}}>
        //   <img className="card-img-top" src="..." alt="Card image cap"/>
        //   <div className="card-body">
        //     <h5 className="card-title">Card title</h5>
        //     <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        //     <a href="#" className="btn btn-primary">Go somewhere</a>
        //   </div>
        // </div>
    );
};

export default Cardlist;