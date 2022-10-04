import { useState } from 'preact/hooks';
import Details from '../details/details';
import apiService from '../../services/api';
import style from './order.css';

const Order = (props) => {
  const { item, index } = props;
  const { _id, ordered, ...orderData } = item;
  const [isOrderVisible, setVisibility] = useState(false);

  return (
    < div >
      {console.log({ orderData })}
      <div className={ordered ? style.isordered : style.order}>
        <div className={style.grid}>
          <p className={style.row}>{index + 1}</p>
          <p className={style.row}>{item.name.toLowerCase()}</p>
          <p className={style.row}>{item.mobile || '-'}</p>
        </div>
        <div
          className={style.expand}
          onClick={() => {
            setVisibility(isOrderVisible ? false : true)
          }}
        >
          {isOrderVisible ? "Collapse" : "Expand"}
        </div>
      </div>
      {
        isOrderVisible
        && <Details
          data={orderData}
          orderStatus={ordered}
          submitApi={() => apiService.submitOrder(_id)}
        />
      }
    </div >
  );
}

export default Order;