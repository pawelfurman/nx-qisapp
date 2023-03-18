import { Injectable } from '@angular/core';


@Injectable()
export class ExerciseEngineService {


  prepareQuestionsToGuess(questions: any[], repetition: number){
    const questionIds: number[] = questions.map(q => q.id as number)
    const toGuess: number[] = []
    while(repetition > 0){
      toGuess.push(...questionIds)
      repetition--;
    }
    return this.shuffleArray(toGuess)
  }

  shuffleArray<T>(array: T[]): T[]{
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  }


  setupCorrectAnswer(questionsToGuess: number[], guessed: number[]){
    return {
      toGuess: questionsToGuess.slice(1, questionsToGuess.length),
      guessed: [questionsToGuess[0], ...guessed]
    }
  }

  setupIncorrectAnswer(questionsToGuess: number[], multiplier: number){
    const toGuess = [...questionsToGuess]
    const questionToRepeat = toGuess[0]

    while(multiplier > 1){
      toGuess.push(questionToRepeat)
      multiplier--;
    }

    return this.shuffleArray(toGuess);
  }


  findQuestion(id: number, questions: any[]){
    return id ? Object.assign({}, questions.find(q => q.id === id)) : undefined
  }


  prepareQuestion(question: any){
    return {
      ...question,
      firstValue: question.firstValue || '',
      firstValueCollocation: question.firstValueCollocation || '',
      firstValueUsage: question.firstValueUsage || '',
      secondValue: question.secondValue || '',
      secondValueCollocation: question.secondValueCollocation || '',
      secondValueUsage: question.secondValueUsage || '',
    }
  }

  prepareReverseQuestion(question: any){
    return {
      ...question,
      firstValue: question.secondValue || '',
      firstValueCollocation: question.secondValueCollocation || '',
      firstValueUsage: question.secondValueUsage || '',
      secondValue: question.firstValue || '',
      secondValueCollocation: question.firstValueCollocation || '',
      secondValueUsage: question.firstValueUsage || ''
    }
  }

  normalizeString(str: string){
    return str
    .replace(/ /gi, "")
    .toLowerCase()
    .split(',')
    .sort((a:string,b: string) => a > b ? 1:-1)
    .join(',')
    .normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z\s])/g, '')
  }

  /**
   * Return true if answers are the same, return false if not
   * @param firstAnswer 
   * @param secondAnswer 
   */
  compareAnswers(firstAnswer: string, secondAnswer: string): boolean{
    return this.normalizeString(firstAnswer) === this.normalizeString(secondAnswer)
  }
}