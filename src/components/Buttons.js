import { ACTIONS } from "../App";

export default function Buttons({dispatch, digit}) {
    return (
        <button
        style={{color: '#FDFDFD'}}
            onClick={() => dispatch({type: ACTIONS.ADD, payload: {digit}})}
        >
            {digit}
        </button>
    )
}