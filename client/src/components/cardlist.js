import React, { useEffect, useState } from 'react';
import { addFavoriteCard, removeFavoriteCard, returnUserData } from '../services/userdata';
import { useSnackbar } from 'notistack';


function Cardlist(props) {

    let [userData, setUserData] = useState();
    let [update, forceUpdate] = useState(1);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setUserData(returnUserData());
    }, []);


    const showBtnFav = (item) => {
      if (!userData.cards.includes(item.bsnNumber)) {
        return (
          <button className="btn btn-sm btn-dark ms-2" onClick={async() => {
            let data = await addFavoriteCard(item.bsnNumber);
            if (data.n === 1) {
              enqueueSnackbar('Added to favorites!', {variant: 'success'});
              // by default, when the component’s state or props changes,
              // the component will re-render.
              forceUpdate(update + 1);
            }
          }}><i className="fa fa-plus" aria-hidden="true"></i>
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
          }}><i className="fa fa-remove" aria-hidden="true"></i>
          </button>
        )
      }
    }


    return (
      <div className="row">
        {props.propy.map(item => {
          // ?. means optional property
          let bg = item.bsnImageUrl?.length > 2 ? item.bsnImageUrl : '/images/default.jpg'
          return (
            <article key={item._id} className="col-lg-4 p-3">
              <div className="border border-dark" style={{backgroundColor:"#222"}}>
                <h3 className="text-white text-center p-1" style={{backgroundColor:"#444"}}>{item.bsnName}</h3>
                {/* CSS code of getting url for a background image from the database */}
                <div className="meishiImage" style={{backgroundImage:`url(${bg})`}}></div>
                <div className="small mt-1 text-center" style={{backgroundColor:"#333", color:"#c7c7c7"}}>{item.bsnDescription}</div>
                <div className="small mt-1 text-center text-white" style={{backgroundColor:"#333"}}>
                  <span className="iconify" data-icon="mdi:phone" data-inline="false"></span> {item.bsnPhone} - {item.bsnAddress}
                  { userData._id && showBtnFav(item) }
                </div>            
              </div>
            </article>
          )
        })}
      </div>
    );
}

export default Cardlist;