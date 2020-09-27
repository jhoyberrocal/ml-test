import React from 'react';
import './ListItem.scss';

function ListItem(props) {
    const {item} = props;
    return (
      <div className="list-item">
          <img className="list-item-img"
               src={item.thumbnail}
               alt={item.title}
          />
          <div className="list-item-content">
              <p className="item-price">
                  ${item.price.toLocaleString('COP')}
                  {item.shipping.free_shipping ? (
                      <img
                          className="item-free"
                          src="/images/ic_shipping.png"
                          srcSet="/images/ic_shipping.png 1x, /images/ic_shipping@2x.png 2x"
                          alt="Free shipping"
                      />
                  ) : ''}
              </p>
              <p className="item-title">{item.title}</p>
          </div>
          <span className="list-item-address">{item.address.city_name}</span>
          <hr className="list-item-divider" />
      </div>
    );
}

export default ListItem;