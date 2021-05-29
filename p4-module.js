const { data } = require("./p4-data");

//Test Case
//console.log(data);

function getQuestions() {
  const questionArray = [];
  for (let i in data) {
    questionArray.push(data[i].question);
  }
  return questionArray;
}

//Test Case
//console.log(getQuestions());

function getAnswers() {
  let answerArray = [];
  for (let i in data) {
    answerArray.push(data[i].answer);
  }
  return answerArray;
}

//Test Case
//console.log(getAnswers());

function getQuestionsAnswers() {
  return [...data];
}

//Test Case
//console.log(getQuestionsAnswers());

function handleErrorsQuestions(number) {
  let error = "";
  if (Number.isInteger(number) === false) {
    error = "Question number must be an integer";
  } else if (number <= 0) {
    error = "Question number must be >= 1";
  } else if (number > data.length) {
    error = `Question number must be less than the number of questions (${data.length})`;
  }
  return error;
}

function getQuestion(number = "") {
  let error = handleErrorsQuestions(number);
  if (error === "") {
    return {
      question: getQuestions()[number - 1],
      number: number,
      error: error,
    };
  } else {
    return {
      question: "",
      number: "",
      error: error,
    };
  }
}

//Test Case
//console.log(getQuestion(1));

function handleErrorsAnswers(number) {
  let error = "";
  if (Number.isInteger(number) === false) {
    error = "Answer number must be an integer";
  } else if (number <= 0) {
    error = "Answer number must be >= 1";
  } else if (number > data.length) {
    error = `Answer number must be less than the number of answers (${data.length})`;
  }
  return error;
}

function getAnswer(number = "") {
  let error = handleErrorsAnswers(number);
  if (error === "") {
    return {
      answer: getAnswers()[number - 1],
      number: number,
      error: error,
    };
  } else {
    return {
      answer: "",
      number: "",
      error: error,
    };
  }
}

//Test Case
//console.log(getAnswer(1));

function getQuestionAnswer(number = "") {
  let error = "";
  error = handleErrorsQuestions(number);
  if (error === "") {
    return {
      question: getQuestions()[number - 1],
      answer: getAnswers()[number - 1],
      number: number,
      error: error,
    };
  } else {
    return {
      question: "",
      answer: "",
      number: "",
      error: error,
    };
  }
}

//Test Case
//console.log(getQuestionAnswer(1));

function addQuestionAnswer(info = {}) {
  maxNumber = data.length;
  let error = "";
  if (info === {} || undefined) {
    error = "Object question property required";
  } else if (info.question === undefined) {
    error = "Object question property required";
  } else if (info.answer === undefined) {
    error = "Object answer property required";
  }
  if (error === "") {
    data.push(info);
    return {
      error: error,
      message: "Question added",
      number: maxNumber + 1,
    };
  } else {
    return {
      error: error,
      message: "",
      number: -1,
    };
  }
}

//Test Cases
//addQuestionAnswer({ question: "Q4", answer: "A4" });
//console.log(data);
//addQuestionAnswer({ question: "Q5", answer: "A5" });
//console.log(data);

function updateQuestionAnswer(info = {}) {
  let error = "";
  if (info.number === undefined || Number.isInteger(info.number) === false) {
    error = "Object question propery must be a valid integer";
  }
  if (info.question === undefined && info.answer === undefined) {
    error = "Object question property or answer property required";
  }

  if (error === "") {
    const { question, answer } = info;
    data[info.number - 1] = { question, answer };
    return {
      error: error,
      message: `Question ${info.number} updated`,
      number: info.number,
    };
  } else {
    return error;
  }
}

function deleteQuestionAnswer(num) {
  let error = "";
  if (Number.isInteger(num) === false) {
    error = "Question/answer number must be an integer";
  } else if (num <= 0) {
    error = "Question/answer number must be >= 1";
  } else if (num > data.length) {
    error = `Question/answer number must be less than the number of questions (${data.length})`;
  }
  if (error === "") {
    let newData = data.slice(num);
    data.splice(num - 1, 1);
    console.log(newData);
    return {
      error: error,
      message: `Question ${num} deleted`,
      number: num,
    };
  } else {
    return {
      error: error,
      message: "",
      number: "",
    };
  }
}

module.exports = {
  getQuestions,
  getAnswers,
  getQuestionsAnswers,
  getQuestion,
  getAnswer,
  getQuestionAnswer,
  addQuestionAnswer,
  updateQuestionAnswer,
  deleteQuestionAnswer,
};
