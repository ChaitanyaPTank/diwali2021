import { MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "preact/hooks";
import { price } from '../../data.json';

export const Suggestions = (props) => {

  const { order, setOrderState } = props;
  const [included, setIncluded] = useState(Object.keys(order));
  const [suggestions, setSuggestions] = useState(Object.keys(price).filter(e => !included.includes(e)));

  useEffect(() => {
    setIncluded(Object.keys(order));
  }, [order]);

  useEffect(() => {
    setSuggestions(Object.keys(price).filter(e => !included.includes(e)))
  }, [included]);
  return (
    <>
      <select style={{ height: '24px' }} value={''} onChange={(e) => setOrderState(0, e.target.value)}>
        {suggestions
          .sort()
          .map(e => <option value={e}>
            {e.split('_').join(' ').toUpperCase()}
          </option>)}
      </select>
    </>
  )
}