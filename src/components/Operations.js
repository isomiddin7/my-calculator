import { ACTIONS } from '../App'

export default function Operations({ dispatch, operation }) {
  return (
    <button
      style={{background: "#ff9501"}}
      onClick={() =>
        dispatch({ type: ACTIONS.CHOICE, payload: { operation } })
      }
    >
      {operation}
    </button>
  )
}