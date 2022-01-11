import { useState, useEffect } from "preact/hooks";
import style from './details.css';
import { price } from '../../data.json';

const Details = (props) => {
  const { data, orderStatus, submitApi } = props;
  const { name, mobile, ...rest } = data;
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState(orderStatus);

  const handleSubmitOrder = async () => {
    const { code, result } = await submitApi();
    console.log({ code, result });
    if (code === 200) {
      setStatus(true);
      window.print();
    }
  }

  useEffect(() => {
    let total = 0;
    setOrder(Object.entries(rest).map(([item, weight]) => {
      if (weight) {
        total += weight * price[item] * 2;
        return (
          <p>
            <strong>{item.split("_").join(" ").toUpperCase()} </strong>
            : {weight} Kg
            = {weight * price[item] * 2} Rs
          </p>
        )
      }
    }));
    setTotal(total);
  }, [data]);

  return (
    <>
      <div className={style.print}>
        <div className={style.orderinfo}>
          <p>
            <strong>
              {name && name.toUpperCase()}
            </strong>
          </p>
          {order}
          <p><strong>TOTAL</strong> : {total}</p>
          {status !== true
            ? <button onClick={handleSubmitOrder}><strong>SUBMIT</strong></button>
            : <button onCLick={() => window.print()}><strong>PRINT</strong></button>}
        </div>
      </div>
    </>
  )
}

export default Details;