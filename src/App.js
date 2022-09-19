import { useReducer } from "react"
import Buttons from "./components/Buttons"
import Operations from "./components/Operations"
import './style.css'

export const ACTIONS = {
  ADD: "add",
  CHOICE: "choice",
  CLEAR: "clear",
  DELETE: "delete",
  EVALUATE: "evaluate",
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD:
      if (state.overwrite) {
        return {
          ...state,
          currentInput: payload.digit,
          overwrite: false,
        }
      }
      if (payload.digit === "0" && state.currentInput === "0") {
        return state
      }
      if (payload.digit === "." && state.currentInput.includes(".")) {
        return state
      }

      return {
        ...state,
        currentInput: `${state.currentInput || ""}${payload.digit}`,
      }
    case ACTIONS.CHOICE:
      if (state.currentInput == null && state.previousInput == null) {
        return state
      }

      if (state.currentInput == null) {
        return {
          ...state,
          operation: payload.operation,
        }
      }

      if (state.previousInput == null) {
        return {
          ...state,
          operation: payload.operation,
          previousInput: state.currentInput,
          currentInput: null,
        }
      } 

      return {
        ...state,
        previousInput: evaluate(state),
        operation: payload.operation,
        currentInput: null,
      }
    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.DELETE:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentInput: null,
        }
      }
      if (state.currentInput == null) return state
      if (state.currentInput.length === 1) {
        return { ...state, currentInput: null }
      }

      return {
        ...state,
        currentInput: state.currentInput.slice(0, -1),
      }
    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentInput == null ||
        state.previousInput == null
      ) {
        return state
      }

      return {
        ...state,
        overwrite: true,
        previousInput: null,
        operation: null,
        currentInput: evaluate(state),
      }
  }
}

function evaluate({ currentInput, previousInput, operation }) {
  const previous = parseFloat(previousInput)
  const current = parseFloat(currentInput)
  if (isNaN(previous) || isNaN(current)) return ""
  let operations = ""
  switch (operation) {
    case "+":
      operations = previous + current
      break
    case "-":
      operations = previous - current
      break
    case "*":
      operations = previous * current
      break
    case "÷":
      operations = previous / current
      break
  }

  return operations.toString()
}

function App() {
  const [{ currentInput, previousInput, operation }, dispatch] = useReducer(
    reducer,
    {}
  )

  return (
    <div className="calculator">
      <div className="result">
        <div className="previous-input" style={{color: 'white'}}>
          {previousInput} {operation}
        </div>
        <div className="current-input">{currentInput}</div>
      </div>
      <button
        style={{color: '#FDFDFD'}}
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button style={{color: '#FDFDFD'}} onClick={() => dispatch({ type: ACTIONS.DELETE })}>
        DEL
      </button>
      <Operations operation="÷" dispatch={dispatch} />
      <Buttons digit="1" dispatch={dispatch} />
      <Buttons digit="2" dispatch={dispatch} />
      <Buttons digit="3" dispatch={dispatch} />
      <Operations operation="*" dispatch={dispatch} />
      <Buttons digit="4" dispatch={dispatch} />
      <Buttons digit="5" dispatch={dispatch} />
      <Buttons digit="6" dispatch={dispatch} />
      <Operations operation="+" dispatch={dispatch} />
      <Buttons digit="7" dispatch={dispatch} />
      <Buttons digit="8" dispatch={dispatch} />
      <Buttons digit="9" dispatch={dispatch} />
      <Operations operation="-" dispatch={dispatch} />
      <Buttons digit="." dispatch={dispatch} />
      <Buttons digit="0" dispatch={dispatch} />
      <button
        className="span-two"
        style={{background: '#ff9501'}}
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  )
}

export default App