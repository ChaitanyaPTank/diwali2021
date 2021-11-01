import style from './add-order.css';
import { useState } from 'preact/hooks';
import Details from '../details/details';

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
    pista_biscuit: '',
    cholafali: '',
    mathiya: '',
  });

  const handleInput = (field, value) => {
    setForm({ ...form, [field]: value });
  }

  const handleSubmit = () => {
    setRender(true);
  }

  return (
    <div className={style.container} >
      {Object.entries(form).map(([key, val]) => {
        return (<OrderItem
          field={key}
          value={val}
          label={key.split("_").join(" ")}
          handler={handleInput}
        />)
      })}
      <button onClick={handleSubmit}>Submit</button>
      {render && <div className={style.print}>
        <Details data={form} />
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
      <p>Total</p>
    </div>
  )
}

export default AddOrder;