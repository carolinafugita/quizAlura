import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import db from '../db.json';
import Widget from '../src/components/Widget'
import QuizBackground from '../src/components/QuizBackground'
import QuizContainer from '../src/components/QuizContainer'
import GitHubCorner from '../src/components/GitHubCorner'
import Question from './question'

const qtdQuestions = db.questions.length;
const mensagemResultado = db.mensagemResultado;

function FimQuiz (props) {

  const endPercentage = props.acertos / qtdQuestions;
  const resultado = mensagemResultado[Math.floor(endPercentage*10)];

  return(
    <Widget>
      <Widget.Header>
        <h1>Você acertou {(endPercentage*100).toFixed(0)}% das perguntas!</h1>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '175px',
          objectFit: 'cover',
        }}
        src={resultado}
      />

      <Widget.Content>

      </Widget.Content>

    </Widget>
  )
}

export default function QuizPage () {
    
    const [statusQuiz,setStatusQuiz] = React.useState ("QUIZ");
    const [acertos,setAcertos] = React.useState (0);

    function countAcertos (isCorrect){
      if(isCorrect){
        setAcertos(acertos +1);
      }
    }

    function endOfQuiz (){
      setStatusQuiz("FIM");
    }

    return (
      <QuizBackground backgroundImage={db.bg}>
       <Head>
          <title>Quiz The Office</title>
       </Head>
        <QuizContainer >

          {statusQuiz === "QUIZ" &&
            <Question
              endOfQuiz = {endOfQuiz}
              countAcertos = {countAcertos}
            /> }

          {statusQuiz === "FIM" &&
            <FimQuiz
              acertos = {acertos}
            /> }

        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/carolinafugita" />
      </QuizBackground>
    );
}

