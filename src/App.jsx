import './App.css';
import { useEffect, useReducer } from 'react';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';

const initialState = {
  questions: [],
  status: 'loading',
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready'
      };
    case "dataFailed":
      return {
        ...state,
        status: 'error'
      }
      default:
        throw new Error('Invalid Action');
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {

    const getQuestions = () => {
      fetch('http://localhost:8000/questions')
        .then((res) => res.json())
        .then(data => dispatch({type: 'dataReceived', payload: data}))
        .catch(err => dispatch({type: 'dataFailed'}))
    }

    getQuestions()
  }, [])

  return (
    <div className='app'>
      <Header />

      <Main>
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </div>
  )
}

export default App
