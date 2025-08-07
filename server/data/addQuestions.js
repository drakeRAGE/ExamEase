const mongoose = require('mongoose');
const Question = require('../models/Question'); // adjust path as needed

const sampleQuestions = [
  {
    questionText: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctOption: 0,
    difficulty: "easy",
    category: "geography",
  },
  {
    questionText: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctOption: 1,
    difficulty: "medium",
    category: "literature",
  },
  {
    questionText: "What is the chemical symbol for water?",
    options: ["O2", "H2O", "CO2", "NaCl"],
    correctOption: 1,
    difficulty: "easy",
    category: "science",
  },
  {
    questionText: "Which planet is known as the Red Planet?",
    options: ["Earth", "Venus", "Mars", "Jupiter"],
    correctOption: 2,
    difficulty: "easy",
    category: "science",
  },
  {
    questionText: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
    correctOption: 1,
    difficulty: "medium",
    category: "art",
  },
  {
    questionText: "What is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctOption: 1,
    difficulty: "easy",
    category: "biology",
  },
  {
    questionText: "Which country hosted the 2016 Summer Olympics?",
    options: ["China", "Brazil", "UK", "Russia"],
    correctOption: 1,
    difficulty: "medium",
    category: "sports",
  },
  {
    questionText: "What is the square root of 64?",
    options: ["6", "7", "8", "9"],
    correctOption: 2,
    difficulty: "easy",
    category: "mathematics",
  },
  {
    questionText: "Who is known as the father of computers?",
    options: ["Charles Babbage", "Alan Turing", "Bill Gates", "Steve Jobs"],
    correctOption: 0,
    difficulty: "medium",
    category: "technology",
  },
  {
    questionText: "Which element has the atomic number 1?",
    options: ["Oxygen", "Hydrogen", "Carbon", "Nitrogen"],
    correctOption: 1,
    difficulty: "easy",
    category: "chemistry",
  },
  {
    questionText: "What is the currency of Japan?",
    options: ["Yen", "Won", "Dollar", "Euro"],
    correctOption: 0,
    difficulty: "easy",
    category: "economics",
  },
  {
    questionText: "Who discovered gravity?",
    options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Nikola Tesla"],
    correctOption: 1,
    difficulty: "medium",
    category: "physics",
  },
  {
    questionText: "Which continent is the Sahara Desert located in?",
    options: ["Asia", "Africa", "Australia", "Europe"],
    correctOption: 1,
    difficulty: "easy",
    category: "geography",
  },
  {
    questionText: "What is the boiling point of water at sea level?",
    options: ["90°C", "100°C", "110°C", "120°C"],
    correctOption: 1,
    difficulty: "easy",
    category: "science",
  },
  {
    questionText: "Who is the author of 'Harry Potter'?",
    options: ["J.K. Rowling", "Stephen King", "Agatha Christie", "George Orwell"],
    correctOption: 0,
    difficulty: "easy",
    category: "literature",
  },
  {
    questionText: "Which organ pumps blood throughout the body?",
    options: ["Liver", "Heart", "Kidney", "Lung"],
    correctOption: 1,
    difficulty: "easy",
    category: "biology",
  },
  {
    questionText: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Pacific", "Arctic"],
    correctOption: 2,
    difficulty: "easy",
    category: "geography",
  },
  {
    questionText: "Who invented the telephone?",
    options: ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Guglielmo Marconi"],
    correctOption: 0,
    difficulty: "medium",
    category: "technology",
  },
  {
    questionText: "Which language is primarily spoken in Brazil?",
    options: ["Spanish", "Portuguese", "French", "English"],
    correctOption: 1,
    difficulty: "easy",
    category: "language",
  },
  {
    questionText: "What is the value of Pi (π) up to two decimal places?",
    options: ["3.12", "3.14", "3.16", "3.18"],
    correctOption: 1,
    difficulty: "easy",
    category: "mathematics",
  },
];

// This is dummy data so i am directly writing the uri
// ALERT: Add later the uri from the .env file
// Later I have to add a fnc to add questions, dummy data for now
mongoose.connect("mongodb://localhost:27017/examease")
  .then(async () => {
    await Question.insertMany(sampleQuestions);
    console.log("Questions inserted!");
    process.exit();
  })
  .catch(err => console.error(err));
