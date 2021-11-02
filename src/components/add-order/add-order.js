import style from './add-order.css';
import { useState } from 'preact/hooks';
import Details from '../details/details';
import apiService from '../../services/api';
import { price } from '../../data.json';

const AddOrder = (props) => {
  const [render, setRender] = useState(false);
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    kaju_mesub: '',
    kaju_kasata: '',
    kaju_katri: '',
    anjeer_patra: '',
    surti_ghari: '',
    ghughra: '',
    khajur_roll: '',
    adadiya: '',
    mohanthal: '',
    sata: '',
    pauva_chevdo: '',
    tikha_gathiya: '',
    flower_gathiya: '',
    alu_sev: '',
    tikhi_papdi: '',
    tikhu_chavanu: '',
    nankhatai: '',
    pista_biscuits: '',
    cholafali: '',
    mathiya: '',
  });
  const excluded = ['name', 'mobile']

  const handleInput = (field, value) => {
    setForm({ ...form, [field]: value });
  }

  const handleSubmit = () => {
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
      {render && <div className={style.child}>
        <Details data={form} url="/add-order" submitApi={() => apiService.addNewOrder(form)} />
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