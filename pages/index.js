import styled from 'styled-components'
import Head from 'next/head'
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget'
import QuizLogo from '../src/components/QuizLogo'
import QuizContainer from '../src/components/QuizContainer'
import QuizBackground from '../src/components/QuizBackground'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import Input from '../src/components/Input'
import Button from '../src/components/Button'

export default function Home () {

  const router = useRouter ();
  const [name,setName] = React.useState ('');

  function pagQuiz (e) { 
    e.preventDefault ();
    router.push( '/quiz' )
  }

  function pegarNome (e) {
    setName( e.target.value ); 
  }

  return (

    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Quiz The Office</title>
      </Head>
      <QuizContainer>
        <QuizLogo />

        <Widget>

          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>

          <Widget.Content>
            <p>{db.description}</p>
            <form onSubmit = { pagQuiz }>  
              <Input
                onChange = { pegarNome }
                placeholder = "Nome"
              />
              <Button type = "submit" disabled = { name.length === 0 }>
                Jogar
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/carolinafugita" />
    </QuizBackground>
  );
}
