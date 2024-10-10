import { useState, useEffect } from "preact/hooks";
import style from './details.css';
import { price } from '../../data.json';
import { Suggestions } from "../suggestions/suggestions";

const DEL_STYLE = {
  margin: '0px',
  textAlign: 'center',
  backgroundColor: 'red',
  position: 'absolute',
  right: 0,
  width: '24px',
  height: '24px',
  borderRadius: '2px'
};

const Details = (props) => {
  const { data, orderStatus, submitApi, id } = props;
  const { name, mobile, ...rest } = data;
  const [orderState, setOrderState] = useState(rest);
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState(orderStatus);
  const [isEditing, setIsEdit] = useState(false);

  const handleSubmitOrder = async () => {
    console.log('submitBro')
    const { code, _result } = await submitApi(id, orderState);
    console.log(rest)
    if (code === 200) {
      setStatus(true);
      window.print();
    }
  }

  const handleOrderStateChange = (val, item) => {
    setOrderState({ ...orderState, [item]: parseFloat(val) });
  }

  const handleDeleteItem = (item) => {
    const { [item]: _foo, ...newState } = orderState;
    setOrderState(newState);
  }

  useEffect(() => {
    let total = 0;
    setOrder(
      Object.entries(orderState).map(([item, weight]) => {
        // if (weight || weight === 0) {
        if (true) {
          total += (weight * price[item] * 2) || 0;
          return (
            <p style={{ position: 'relative' }}>
              <strong>{item.split("_").join(" ").toUpperCase()}</strong>
              : {isEditing
                ? <>
                  <input
                    style={{ width: '50px', height: '16px' }}
                    onChange={(e) => handleOrderStateChange(e.target.value, item)}
                    value={weight || 0}
                  />
                  <button style={DEL_STYLE} onClick={() => handleDeleteItem(item)}>
                    X
                  </button>
                </>
                : <span style={{ width: '50px' }}> {weight} {item === 'swami_rotli' ? 'No' : 'Kg'} </span>}
              = {weight ? (weight * price[item] * 2) : 0} Rs
            </p>
          )
        }
      })
    );
    setTotal(total);
  }, [data, isEditing, orderState]);

  return (
    <>
      <div className={style.print}>
        <div className={style.orderinfo}>
          {!status
            && <span style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button onClick={() => setIsEdit(isEditing ? false : true)}>{isEditing ? 'Close' : 'Edit'}</button>
              {isEditing && <Suggestions setOrderState={handleOrderStateChange} order={orderState} />}
            </span>}
          <p>
            <strong>
              {name && name.toUpperCase()}
            </strong>
          </p>
          {order}
          <p><strong>TOTAL</strong> : {total}</p>
          {
            status !== true
              ? <button onClick={() => (isEditing ? setIsEdit(false) : handleSubmitOrder())}><strong>{isEditing ? 'DONE' : 'SUBMIT'}</strong></button>
              : <button onCLick={() => window.print()}><strong>PRINT</strong></button>
          }
        </div>
      </div>
    </>
  )
}

export default Details;
