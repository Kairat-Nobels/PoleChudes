import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Content, Header as RSHeader, Button } from 'rsuite';
import image from '../../assets/pole.png'
const StartPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/game');
  };

  return (
    <Container>
      <RSHeader style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Поле чудес</h1>
      </RSHeader>
      <div className='wheel'>
        <img src={image} alt="img" />
      </div>
      <Content style={{ textAlign: 'center', marginTop: '50px' }}>
        <Button appearance="primary" size="lg" onClick={handleStart}>
          Начать игру
        </Button>
      </Content>
    </Container>
  );
};

export default StartPage;
