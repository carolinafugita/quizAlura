import React, { useState } from 'react';
import { motion } from 'framer-motion';

import db from '../db.json';
import Widget from '../src/components/Widget'
import Button from '../src/components/Button'
import AlternativesForm from '../src/components/AlternativesForm'

const qtdQuestions = db.questions.length,
      randomQuestions = shuffle(db.questions);


function Question (props) {

  const [index,setIndex] = React.useState (0);
  const question = randomQuestions[index];
  const isDone = index === db.questions.length -1;
  const [isAltSelected,setIsAltSelected] = React.useState(false);
  const [altSelected,setAltSelected] = React.useState (undefined);
  const [isQuestionAnswered,SetIsQuestionAnswered] = React.useState (false);

  function submitAnswer (e) {
    e.preventDefault();
    props.countAcertos( altSelected === question.answer );
    setIsAltSelected(false);
    SetIsQuestionAnswered(true);

    setTimeout( () => {
      SetIsQuestionAnswered(false);
      if(isDone){
        props.endOfQuiz();
      }
      else{
        setIndex(index +1);
      }
    },2*1000)
  }

  return (
    <Widget>

      <Widget.Header>
        <h1>Pergunta {index +1} de {qtdQuestions}</h1>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '175px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
    
      <Widget.Content
        as = {motion.section}
        transition = {{ duration : 1 }}
        variants = {{
          show : { opacity : 1 },
          hidden : { opacity : 0 }
        }}
        initial = "hidden"
        animate = "show"
      >
        <h1>{question.title}</h1>
        <p>{question.description}</p>

        <AlternativesForm
          onSubmit = {submitAnswer}
        >

          {question.alternatives.map((alternative, alternativeId) => {
            const isSelected = isAltSelected && (altSelected === alternativeId);
            const error = isQuestionAnswered && (altSelected === alternativeId) && !(alternativeId === question.answer);
            const correctAnswer = isQuestionAnswered && (alternativeId === question.answer)
              return (
                <Widget.Topic
                  as = "label"
                  key = {alternativeId}
                  htmlFor = {alternativeId}
                  data-selected = {isSelected}
                  data-error = {error}
                  data-correct = {correctAnswer}
                  >
                  <input
                    style = {{ display: 'none' }}
                    id = {alternativeId}
                    name = {index}
                    type = "radio"
                    checked = {isQuestionAnswered}
                    onChange = { () => {
                      setAltSelected(alternativeId);
                      setIsAltSelected(true);}
                    }
                  />
                  {alternative}
                </Widget.Topic>
                );
          })}

          <Button type = "submit" disabled = {!isAltSelected}>
            Confirmar
          </Button>

        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

export default Question;

function shuffle (array){
  
  var aux, random;

  for(let i = array.length -1; i >= 0; i--){
    random = Math.floor(Math.random() * (i));

    aux = array[random];
    array[random] = array[i];
    array[i] = aux; 
  }

  return array;
}