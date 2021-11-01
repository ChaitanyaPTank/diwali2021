import { useState, useEffect } from "preact/hooks";
import style from './details.css';
import { price } from '../../data.json';

const Details = (props) => {
  const { data, id, orderStatus } = props;
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);

  const handleSubmitOrder = async () => {
    const { code, result } = await apiService.submitOrder(id);
    if (code === 200) {
      window.print();
    }
  }

  // const printReciept = () => {
  // const my_window = window.open('', 'mywindow', 'status=1,width=350,height=150');
  // my_window.document.write('<html><head><title>Print Me</title></head>');
  // my_window.document.write('<body onafterprint="self.close()">');
  // my_window.document.write('<p>When you print this window, it will close afterward.</p>');
  // my_window.document.write('</body></html>');
  // }

  useEffect(() => {
    let total = 0;
    setOrder(Object.entries(data).map(([item, weight]) => {
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
          {order}
          <p><strong>TOTAL</strong> : {total}</p>
          {orderStatus !== true
            ? <button onClick={handleSubmitOrder}>SUBMIT</button>
            : <button onCLick={() => window.print()}>PRINT</button>}
        </div>
      </div>
    </>
  )
}

export default Details;