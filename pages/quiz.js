import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import db from '../db.json';
import Widget from '../src/components/Widget'
import QuizBackground from '../src/components/QuizBackground'
import GitHubCorner from '../src/components/GitHubCorner'
/* import Quiz from '../src/components/QuizQuestion' */

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

export default function QuizPage () {

    const [indice,setIndice] = React.useState (0);

    function question (i) {
        return (
            <div>
                <h1>{db.questions[i].title}</h1>
                <p>{db.questions[i].description}</p>
                
                <button display = "block">{db.questions[i].alternatives[0]}</button>
                <button display = "block">{db.questions[i].alternatives[1]}</button>
                <button display = "block">{db.questions[i].alternatives[2]}</button>
                <button display = "block">{db.questions[i].alternatives[3]}</button>
                    
            </div>
        );
    }

    return (
        <QuizBackground backgroundImage={db.bgQuiz}>
        <Head>
          <title>Quiz The Office</title>
        </Head>
        <QuizContainer>
  
          <Widget>
  
            <Widget.Header>
              <h1>{db.title}</h1>
            </Widget.Header>
  
            <Widget.Content>
              {question(indice)}
              <button onClick = {function nextQuestion (){
                  let i = indice + 1;
                  setIndice(i);
                }}>Confirmar
              </button>
            </Widget.Content>
          </Widget>

        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/carolinafugita" />
      </QuizBackground>
    );
}