import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import db from '../db.json';
import Widget from '../src/components/Widget'
import QuizBackground from '../src/components/QuizBackground'
import GitHubCorner from '../src/components/GitHubCorner'
import Button from '../src/components/Button'

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 20%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

const qtdQuestions = db.questions.length;
const mensagemResultado = [
  {
    classif : "Muito boa",
    mensagem : "[mensagem no final do jogo]"
  },
  {
    classif : "Boa",
    mensagem : "[mensagem no final do jogo]"
  },
  {
    classif : "Regular",
    mensagem : "[mensagem no final do jogo]"
  },
  {
    classif : "Ruim",
    mensagem : "[mensagem no final do jogo]"
  },
]

function Question (props) {

  const question = db.questions[props.indice];

  return (
    <Widget>
      <Widget.Header>
        <h1>Pergunta {props.indice +1} / {qtdQuestions}</h1>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
    
      <Widget.Content>
        <h1>{question.title}</h1>
        <p>{question.description}</p>

        <form onSubmit = {props.onSubmit}>

          {question.alternatives.map((alternative, alternativeIndex) => {
              const alternativeId = alternativeIndex;
              return (
                <Widget.Topic
                  as = "label"
                  htmlFor = {alternativeId}
                  >
                  <input
                    style = {{ display: 'none' }}
                    id = {alternativeId}
                    name = {props.indice}
                    type = "radio"
                  />
                  {alternative}
                </Widget.Topic>
                );
          })}
              
          <Button type="submit">
            Confirmar
          </Button>

        </form>
      </Widget.Content>
    </Widget>
  );
}

function FimQuiz (props) {

  let pontuacao = props.acertos / qtdQuestions;

  return(
    <Widget>
      <Widget.Header>
        <h1>Fim!</h1>
      </Widget.Header>
      <Widget.Content>
      <h1>Você acertou {props.acertos} perguntas!</h1>
      <p>{mensagemPontuacao(pontuacao)}</p>
      </Widget.Content>
    </Widget>
  )
}

export default function QuizPage () {

    const [indice,setIndice] = React.useState (0);
    const [statusQuiz,setStatusQuiz] = React.useState ("QUIZ");
    const [acertos,setAcertos] = React.useState (0);

    function nextQuestion (e){
      e.preventDefault();

      let i = indice + 1;
      let a = acertos + 1;
      setAcertos(a);

      if( i < qtdQuestions){
        setIndice(i);
      }
      else{
        setStatusQuiz("FIM");
      }
    }

    return (
      <QuizBackground backgroundImage={db.bgQuiz}>
       <Head>
          <title>Quiz The Office</title>
       </Head>
        <QuizContainer >

          {statusQuiz === "QUIZ" &&
            <Question
              indice = {indice}
              onSubmit = {nextQuestion}
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
  // relacionar a pontuacao com a mensagem no final do quiz
  return mensagemResultado[0].mensagem;
}