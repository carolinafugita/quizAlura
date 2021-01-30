import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import db from '../db.json';
import Widget from '../src/components/Widget'
import QuizBackground from '../src/components/QuizBackground'
import QuizContainer from '../src/components/QuizContainer'
import GitHubCorner from '../src/components/GitHubCorner'
import Question from './question'
import Button from '../src/components/Button'

const qtdQuestions = db.questions.length;

function FimQuiz (props) {

  const endPercentage = props.acertos / qtdQuestions;
  const result = getResult(endPercentage);

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
        src={result.image}
      />

      <Widget.Content>
        <h1>{result.message}</h1>
        <p> </p>      
        <Button onClick = {props.onClick}>
          Voltar
        </Button>
      </Widget.Content>
      
    </Widget>
  )
}

export default function QuizPage () {
    
    const [statusQuiz,setStatusQuiz] = React.useState ("QUIZ");
    const [acertos,setAcertos] = React.useState (0);
    const router = useRouter ();
    

    function countAcertos (isCorrect){
      if(isCorrect){
        setAcertos(acertos +1);
      }
    }

    function endOfQuiz (){
      setStatusQuiz("FIM");
    }

    function goBack (e) { 
      e.preventDefault ();
      router.push( '/' )
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
              onClick = {goBack}
            /> }

        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/carolinafugita" />
      </QuizBackground>
    );
}

function getResult(percentage){
  var iImg = Math.floor(percentage*10);
  var iMsg = -1;
  
  if( iImg < 5 ){
    iMsg = 0;
  }
  else if( iImg < 7 ){
    iMsg = 1;
  }
  else {
    iMsg = 2;
  }

  return {
    image : db.result.image[iImg],
    message : db.result.message[iMsg]
  };
}