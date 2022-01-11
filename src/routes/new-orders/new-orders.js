import style from './new-order.css';

// components
import AddOrder from '../../components/add-order/add-order';
import GetNewOrder from '../../components/new-orders/get-new-orders';

const NewOrder = (props) => {
  return (
    <div className={style.container}>
      <div>
        <span className={style.addOrder}>
          <AddOrder />
        </span>
      </div>
      <div>
        <GetNewOrder />
      </div>
    </div>
  )
}

export default NewOrder;