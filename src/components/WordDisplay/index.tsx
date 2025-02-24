import React from 'react';
import { Panel } from 'rsuite';

interface Props {
  word?: string;
  guessedLetters: string[];
}

const WordDisplay: React.FC<Props> = ({ word = '', guessedLetters }) => {
  return (
    <div className='words'>
      <Panel className='wordDisplay' bordered>
        {(word ?? '').split('').map((letter, index) => (
          <span key={index} className='letter'>
            {guessedLetters.includes(letter.toLowerCase()) ? letter : '*'}
          </span>
        ))}
      </Panel>
    </div>
  );
};

export default WordDisplay;
