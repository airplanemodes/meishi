import React, { useEffect, useState } from 'react';
import '../css/card.css';
import { addFavoriteCard, removeFavoriteCard, returnUserData } from '../services/userdata';
import { useSnackbar } from 'notistack';


function Cardlist(props) {

    let [userData, setUserData] = useState();
    let [update, forceUpdate] = useState(1);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setUserData(returnUserData());
    },[]);


    const showBtnFav = (item) => {
      if (!userData.cards.includes(item.bsnNumber)) {
        return (
          <button className="btn btn-sm btn-dark ms-2" onClick={async() => {
            let data = await addFavoriteCard(item.bsnNumber);
            if (data.n === 1) {
              enqueueSnackbar('Added to favorites!', {variant: 'success'});
              // By default, when the component’s state or props change, the component will re-render.
              forceUpdate(update + 1);
            }
          }}><i class="fa fa-plus" aria-hidden="true"></i>
          </button>
        ) 
      } else {
        return (
          <button className="btn btn-sm btn-dark ms-2" onClick={async() => {
            let data = await removeFavoriteCard(item.bsnNumber);
            if (data.n === 1) {
              enqueueSnackbar('Removed from favorites.', {variant: 'info'});
              forceUpdate(update - 1);
            }
          }}><i class="fa fa-remove" aria-hidden="true"></i>
          </button>
        )
      }
    };


    return (
      <div className="row">
        {props.propy.map(item => {
          // ?. means optional property
          let bg = item.bsnImageUrl?.length > 2 ? item.bsnImageUrl : '/images/default.jpg'
          return (
            <div className="col-lg-4 p-3">
              <article className="border border-dark" style={{backgroundColor:"#222"}}>
                <h3 className="text-white text-center p-1" style={{backgroundColor:"#333"}}>{item.bsnName}</h3>
                <div className="meishiImage" style={{backgroundImage:`url(${bg})`}}></div>
                <div className="small mt-1 text-center" style={{backgroundColor:"#333", color:"#c7c7c7"}}>{item.bsnDescription}</div>
                <div className="small mt-1 text-center text-white" style={{backgroundColor:"#333"}}>
                  <span className="iconify" data-icon="mdi:phone" data-inline="false"></span> {item.bsnPhone} - {item.bsnAddress}
                  { userData._id && showBtnFav(item) }
                </div>            
              </article>
            </div>
          )
        })}
      </div>
    );
};

export default Cardlist;