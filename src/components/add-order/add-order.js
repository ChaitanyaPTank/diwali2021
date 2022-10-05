import style from './add-order.css';
import { useState } from 'preact/hooks';
import Details from '../details/details';
import apiService from '../../services/api';
import { price } from '../../data.json';

const AddOrder = (props) => {
  const [render, setRender] = useState(false);
  const [data, setData] = useState({});
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    ...Object.entries(price).sort().reduce((acc, [k]) => { acc[k] = ''; return acc }, {})
  });
  const excluded = ['name', 'mobile']

  const handleInput = (field, value) => {
    setForm({ ...form, [field]: value });
  }

  const handleSubmit = () => {
    const { name, mobile } = form;
    const finalData = Object.entries(form).filter(([k, v]) => v).reduce((acc, [k, v]) => { acc[k] = v; return acc }, {});
    console.log({ ...finalData, name, mobile });
    setData(finalData);
    setRender(true);
  }

  return (
    <div>
      <div className={style.container} >
        <div>
          {Object.entries(form).map(([key, val]) => {
            return (<OrderItem
              field={key}
              type={!excluded.includes(key) ? "number" : "text"}
              value={val}
              label={key.split("_").join(" ")}
              handler={handleInput}
            />)
          })}
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
      {render
        && <div className={style.child}>
          <Details data={data} url="/add-order" submitApi={() => apiService.addNewOrder(form)} />
        </div>}
    </div>
  )
}

const OrderItem = (props) => {
  const {
    label,
    type,
    value,
    field,
    handler
  } = props;
  return (
    <div className={style.grid}>
      <label htmlFor={label}><strong>{label}</strong></label>
      <input onKeyUp={(e) => handler(field, e.target.value)} value={value || ""} placeholder={label} type={type} />
      {field !== 'mobile' && field !== 'name' && value && <p> = {value * price[field] * 2} Rs.</p>}
    </div>
  )
}

export default AddOrder;