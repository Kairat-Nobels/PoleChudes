import { useState, useEffect } from "react";
import { Button, Input, Panel } from "rsuite";
import WordDisplay from "../../components/WordDisplay";
import { useSelector } from "react-redux";
import { fetchQuestions, selectRandomQuestion, guessLetter, guessWord } from "../../redux/game/gameSlice";
import { showToast } from "../../ui/toast";
import { useAppDispatch } from "@hooks/hooks";

const GamePage = () => {
  const dispatch = useAppDispatch();

  const { currentQuestion, guessedLetters, questions, solved } = useSelector((state) => state.game);

  const [letter, setLetter] = useState("");
  const [word, setWord] = useState("");

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  useEffect(() => {
    if (questions.length > 0 && !currentQuestion) {
      dispatch(selectRandomQuestion());
    }
  }, [questions, currentQuestion, dispatch]);

  const handleLetterSubmit = () => {
    if (letter.length === 1) {
      dispatch(guessLetter(letter));
      if (currentQuestion?.answer.includes(letter)) {
        showToast.success(`Вы угадали букву "${letter}"! 🎉`);
      } else {
        showToast.error(`Буква "${letter}" отсутствует 😢`);
      }
      setLetter("");
    }
  };

  const handleWordSubmit = () => {
    if (word.trim()) {
      dispatch(guessWord(word));
      if (word.toLowerCase() === currentQuestion?.answer.toLowerCase()) {
        showToast.success("Вы угадали слово! 🏆");
      } else {
        showToast.error("Неправильный ответ 😢");
      }
      setWord("");
    }
  };

  const handleNextQuestion = () => {
    dispatch(selectRandomQuestion());
  };

  return (
    <Panel className="gamePage" header="Поле чудес" bordered>
      <h4><span className="grey">Вопрос:</span> {currentQuestion?.question ?? "Загрузка вопроса..."}</h4>

      <WordDisplay word={currentQuestion?.answer ?? ""} guessedLetters={guessedLetters} />

      {!solved ? (
        <div className="inputContainer">
          <Input
            className="letterInput"
            placeholder="Напишите букву"
            value={letter}
            onChange={setLetter}
            maxLength={1}
          />
          <Button onClick={handleLetterSubmit} disabled={!letter}>Отправить букву</Button>

          <Input
            placeholder="Введите целое слово"
            value={word}
            onChange={setWord}
          />
          <Button onClick={handleWordSubmit} disabled={!word.trim()}>Отправить слово</Button>
        </div>
      ) : (
        <Button className="nextButton" appearance="primary" onClick={handleNextQuestion}>
          Следующий вопрос
        </Button>
      )}
    </Panel>
  );
};

export default GamePage;
