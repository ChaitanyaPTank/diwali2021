import style from './style.css';
import { useEffect, useState } from 'preact/hooks';
import apiService from '../../services/api';


const Stock = () => {
  const [stock, setStock] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await apiService.getStock();
      console.log(result);
      if (result.data) {
        setStock(Object.entries(result.data.stock).map(([key, val], index) => {
          return (
            <>
              <p className={style.row}>
                <strong> {index + 1}. </strong>
                <strong> {key.toUpperCase()} </strong>
                <strong> {parseFloat(result.data.order[key]).toFixed(2)} Kg </strong>
                <strong> {val.toFixed(2)} Kg </strong>
              </p>
            </>
          )
        }))
      }
      // console.log(result);
    })();
  }, []);


  return (
    <div className={style.container}>
      <p className={style.title}>
        <strong>No.</strong>
        <strong>Item</strong>
        <strong>Sold</strong>
        <strong>In Stock</strong>
      </p>
      {/* <div className={style.stock}> */}
      {stock}
      {/* </div> */}
    </div>
  )
}

export default Stock;