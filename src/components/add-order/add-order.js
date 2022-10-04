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
    sata: '',
    mohanthal: '',
    magas: '',
    gulab_jamun: '',
    motichur_ladu: '',
    churma_ladu: '',
    dudh_na_penda: '',
    surti_ghari: '',
    kaju_katri: '',
    kaju_mesub: '',
    pauva_chavdo: '',
    bhanagari_gathiya: '',
    tikha_ganthiya: '',
    naylon_ganthiya: '',
    ratlami_sev: '',
    tikhi_papdi: '',
    moli_papdi: '',
    sev_regular: '',
    khari: '',
    dry_kachori: '',
    fulvadi: '',
    nadiyadi_chavanu: '',
    navratna_chavanu: '',
    nankhatai: '',
    dry_fruit_biscuit: '',
    badam_biscuit: '',
    black_berry_biscuit: '',
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
      {render
        && <div className={style.child}>
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