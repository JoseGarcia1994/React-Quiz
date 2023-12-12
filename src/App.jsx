import './App.css';
import { useEffect, useReducer } from 'react';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import Loader from './components/Loader.jsx';
import Error from './components/Error.jsx';
import StartScreen from './components/StartScreen.jsx';
import Question from './components/Question.jsx';

const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null, 
  points: 0
}

const reducer = (state, action) => {
  switch (action.type) {
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
      };
    case "start":
      return {
        ...state,
        status: "active"
      };
    case "newAnswer":
      const question = state.questions.at(state.index)
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points
      };
    default:
      throw new Error('Invalid Action');
  }
}

function App() {

  const [{ questions, status, index, answer }, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length

  useEffect(() => {

    const getQuestions = () => {
      fetch('http://localhost:8000/questions')
        .then((res) => res.json())
        .then(data => dispatch({ type: 'dataReceived', payload: data }))
        .catch(err => dispatch({ type: 'dataFailed' }))
    }

    getQuestions()
  }, [])

  return (
    <div className='app'>
      <Header />

      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === 'active' &&
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
        }
      </Main>
    </div>
  )
}

export default App
