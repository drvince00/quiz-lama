import { useEffect, useMemo, useState } from 'react';
import './app.css';
import Trivia from './component/Trivia';
import Timer from './component/Timer';
import Start from './component/Start';

function App() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState('$ 0');
  const [userName, setUserName] = useState(null);

  const data = [
    {
      id: 1,
      question: '오늘은 어제__ 날씨가 화창합니다.',
      answers: [
        {
          id: 1,
          text: '보다',
          correct: true,
        },
        {
          id: 2,
          text: '요리',
          correct: false,
        },
        {
          id: 3,
          text: '설마',
          correct: false,
        },
        {
          id: 4,
          text: '금방',
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: '__하지마. 다 잘 될거야.',
      answers: [
        {
          id: 1,
          text: '이제',
          correct: false,
        },
        {
          id: 2,
          text: '인사',
          correct: false,
        },
        {
          id: 3,
          text: '걱정',
          correct: true,
        },
        {
          id: 4,
          text: '성공',
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: '다음 주 부터는 장마가 시작됩니다. __에 유의하도록 하세요.',
      answers: [
        {
          id: 1,
          text: '체력',
          correct: false,
        },
        {
          id: 2,
          text: '안전',
          correct: true,
        },
        {
          id: 3,
          text: '성공',
          correct: false,
        },
        {
          id: 4,
          text: '언제나',
          correct: false,
        },
      ],
    },
  ];

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: '$ 100' },
        { id: 2, amount: '$ 200' },
        { id: 3, amount: '$ 300' },
        { id: 4, amount: '$ 500' },
        { id: 5, amount: '$ 1,000' },
        { id: 6, amount: '$ 2,000' },
        { id: 7, amount: '$ 4,000' },
        { id: 8, amount: '$ 8,000' },
        { id: 9, amount: '$ 16,000' },
        { id: 10, amount: '$ 32,000' },
        { id: 11, amount: '$ 64,000' },
        { id: 12, amount: '$ 125,000' },
        { id: 13, amount: '$ 250,000' },
        { id: 14, amount: '$ 500,000' },
        { id: 15, amount: '$ 1,000,000' },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 && setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [moneyPyramid, questionNumber]);

  console.log('USERNAME:', userName);

  return (
    <div className="app">
      {userName ? (
        <>
          <div className="main">
            {stop ? (
              <h1 className="endText"> You earned: {earned}</h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer setStop={setStop} questionNumber={questionNumber} />
                  </div>
                </div>
                <div className="bottom">
                  <Trivia
                    data={data}
                    setStop={setStop}
                    setQuestionNumber={setQuestionNumber}
                    questionNumber={questionNumber}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid.map((m) => (
                <li
                  key={m.id}
                  className={questionNumber === m.id ? 'moneyListItem active' : 'moneyListItem'}
                >
                  <span className="moneyListItemNumber">{m.id}</span>
                  <span className="moneyListItemAmount">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Start setUserName={setUserName} />
      )}
    </div>
  );
}

export default App;
