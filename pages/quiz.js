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
const mensagemResultado = [
  {
    img : "https://i.pinimg.com/originals/74/f7/70/74f770284500fc194576c438105ef26f.gif",
    mensagem : "[mensagem no final do jogo]"
  },
  {
    img : "https://media3.giphy.com/media/5vef4sn8zhnlC/source.gif",
    mensagem : "[mensagem no final do jogo]"
  },
  {
    img : "https://i.pinimg.com/originals/e6/7a/e7/e67ae7d3704d841a09465e092f3fbfcf.gif",
    mensagem : "[mensagem no final do jogo]"
  },
  {
    img : "https://64.media.tumblr.com/e201fbaa3850eb89f3989c20f600521b/tumblr_n5dsa603841tbukr2o1_250.gif",
    mensagem : "[mensagem no final do jogo]"
  },
]

function FimQuiz (props) {

  const endPercentage = props.acertos / qtdQuestions;
  const resultado = mensagemPontuacao(endPercentage);

  return(
    <Widget>
      <Widget.Header>
        <h1>Você acertou {endPercentage*100}% das perguntas!</h1>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={resultado.img}
      />

      <Widget.Content>
      <p>{resultado.mensagem}</p>
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

function mensagemPontuacao (pontuacao){

    if( pontuacao >= 0.75 ){
      return mensagemResultado[0]; 
    }
    else if( pontuacao >= 0.5 ){
      return mensagemResultado[1]; 
    }
    else if( pontuacao >= 0.25 ){
      return mensagemResultado[2]; 
    }
    else{
      return mensagemResultado[3]; 
    }
}