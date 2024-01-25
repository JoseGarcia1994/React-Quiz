import { useQuiz } from './context/QuizContext.jsx';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import Loader from './components/Loader.jsx';
import Error from './components/Error.jsx';
import StartScreen from './components/StartScreen.jsx';
import Question from './components/Question.jsx';
import NextButton from './components/NextButton.jsx';
import Progress from './components/Progress.jsx';
import FinishedScreen from './components/FinishedScreen.jsx';
import Footer from './components/Footer.jsx';
import Timer from './components/Timer.jsx';
import './App.css';

function App() {
  const { status } = useQuiz();
  return (
    <div className='app'>
      <Header />

      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen />}
        {status === 'active' &&
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        }
        {status === 'finished' &&
          <FinishedScreen />
        }
      </Main>
    </div>
  )
}

export default App
