import style from './add-order.css';
import { useRef, useState } from 'preact/hooks';
import Details from '../details/details';
import apiService from '../../services/api';
import { price } from '../../data.json';
import { forwardRef } from 'preact/compat';

const AddOrder = (props) => {

  const reference = useRef(null);
  const [render, setRender] = useState(false);
  const [data, setData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    ...Object.entries(price)
      .sort()
      .reduce((acc, [k]) => { acc[k] = ''; return acc }, {})
  });
  const excluded = ['name', 'mobile']

  const handleInput = (field, value) => {
    setForm({ ...form, [field]: value });
  }

  const handleSubmit = () => {
    setSubmitted(true);

    if (!form.name) {
      reference.current.focus();
      return;
    }

    const finalData = Object.entries(form)
      .filter(([k, v]) => v)
      .reduce((acc, [k, v]) => { acc[k] = v; return acc }, {});
    setData(finalData);
    setRender(true);
  }

  return (
    <div>
      <div className={style.container} >
        <div>
          {Object.entries(form).map(([key, val]) => {
            key === 'name' && console.log(key);
            return (<OrderItem
              field={key}
              type={!excluded.includes(key) ? "number" : "text"}
              value={val}
              label={key.split("_").join(" ")}
              handler={handleInput}
              ref={key === 'name' ? reference : null}
              submitted={key === 'name' ? submitted : null}
            />)
          })}
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
      {render
        && <div className={style.child}>
          <Details
            data={data}
            url="/add-order"
            submitApi={() => apiService.addNewOrder(form)}
          />
        </div>}
    </div>
  )
}

const errorStyle = { color: 'red', fontSize: '10px', marginLeft: '8px', marginTop: '6px' }

const OrderItem = forwardRef((props, ref) => {
  const {
    label,
    type,
    value,
    field,
    handler,
    submitted
  } = props;
  return (
    <div className={style.grid}>
      <label htmlFor={label}><strong>{label}</strong></label>
      <input
        ref={ref || null}
        onKeyUp={(e) => handler(field, e.target.value)}
        value={value || ""}
        placeholder={label}
        type={type}
      />
      {!['mobile', 'name'].includes(field)
        && value
        && <p> = {value * price[field] * 2} Rs.</p>
      }
      {field === 'name'
        && submitted
        && !value
        && <span style={errorStyle}>Name is required</span>}
    </div>
  )
});


export default AddOrder;