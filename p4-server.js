const { data } = require("./p4-data.js");
const {
  getQuestions,
  getAnswers,
  getQuestionsAnswers,
  getQuestion,
  getAnswer,
  getQuestionAnswer,
  addQuestionAnswer,
  updateQuestionAnswer,
  deleteQuestionAnswer,
} = require("./p4-module.js");

const fastify = require("fastify")();

fastify.get("/cit/question", (request, reply) => {
  reply.code(200).header("Content-Type", "application/json").send({
    error: "",
    statusCode: 200,
    questions: getQuestions(),
  });
});

fastify.get("/cit/answer", (request, reply) => {
  reply.code(200).header("Content-Type", "application/json").send({
    error: "",
    statusCode: 200,
    questions: getAnswers(),
  });
});

fastify.get("/cit/questionanswer", (request, reply) => {
  reply.code(200).header("Content-Type", "application/json").send({
    error: "",
    statusCode: 200,
    questions_answers: getQuestionsAnswers(),
  });
});

fastify.get("/cit/question/:number", (request, reply) => {
  const requestNumber = request.params.number;
  const questionObject = getQuestion(parseInt(requestNumber));
  const { question, number, error } = questionObject;
  reply.code(200).header("Content-Type", "application/json").send({
    error: error,
    statusCode: 200,
    question: question,
    number: number,
  });
});

fastify.get("/cit/answer/:number", (request, reply) => {
  const requestNumber = request.params.number;
  const answerObject = getAnswer(parseInt(requestNumber));
  const { answer, number, error } = answerObject;
  reply.code(200).header("Content-Type", "application/json").send({
    error: error,
    statusCode: 200,
    answer: answer,
    number: number,
  });
});

fastify.get("/cit/questionanswer/:number", (request, reply) => {
  const requestNumber = request.params.number;
  const qaObject = getQuestionAnswer(parseInt(requestNumber));
  const { question, answer, number, error } = qaObject;
  reply.code(200).header("Content-Type", "application/json").send({
    error: error,
    statusCode: 200,
    question: question,
    answer: answer,
    number: number,
  });
});

fastify.get("*", (request, reply) => {
  reply.code(404).header("Content-Type", "application/json").send({
    error: "Route not found",
    statusCode: 404,
  });
});

fastify.post("/cit/question", (request, reply) => {
  console.log(request);

  //Get Info from client
  const objectFromClient = JSON.parse(request.body);
  console.log(objectFromClient);

  //Do something with that info
  const { error, number } = addQuestionAnswer(objectFromClient);

  //Send reply with new student
  reply.code(201).header("Content-Type", "application/json").send({
    error: error,
    statusCode: "201",
    number: number,
  });
});

fastify.put("/cit/question", (request, reply) => {
  console.log(request);

  //Get Info from client
  const objectFromClient = JSON.parse(request.body);
  console.log(objectFromClient);

  //Do something with that info
  const { error, number } = updateQuestionAnswer(objectFromClient);

  //Send reply with new student
  reply.code(201).header("Content-Type", "application/json").send({
    error: error,
    statusCode: "201",
    number: number,
  });
  console.log(data);
});

fastify.delete("/cit/question/:number", (request, reply) => {
  console.log(request);
  const requestNumber = parseInt(request.params.number);
  //Get Info from client
  //Do something with that info
  const { error, number } = deleteQuestionAnswer(requestNumber);

  //Send reply with new student
  reply.code(201).header("Content-Type", "application/json").send({
    error: error,
    statusCode: "201",
    number: number,
    data,
  });
  console.log(data);
});

//Listen Base
const listenIP = "localhost";
const listenPort = 8080;
//Listening
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    //Log error and exit
    console.log(err);
    process.exit(1);
  }
  //Display IP and Port of running server
  console.log(`Server listening on ${address}`);
});
