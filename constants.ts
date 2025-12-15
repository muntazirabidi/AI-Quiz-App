import { QuizConfig } from './types';

// Brand Colors:
// Navy: #120f38
// Teal: #5ce1e6
// Orange: #ff7e38
// Yellow: #ffe045

export const TEEN_QUIZ: QuizConfig = {
  title: "AI Quiz for Teens",
  description: "Level up your skills with future tech.",
  eventDate: "January 25th",
  // Using specific hex codes for the new Light UI styling
  themeColor: "bg-[#5ce1e6]", 
  accentColor: "text-[#120f38]", 
  questions: [
    {
      id: 1,
      text: "What does “AI” stand for?",
      options: [
        "Advanced Internet",
        "Artificial Intelligence",
        "Automated Information",
        "Always Intelligent"
      ],
      correctAnswer: "Artificial Intelligence"
    },
    {
      id: 2,
      text: "Which of these is an example of AI?",
      options: [
        "A regular calculator",
        "A robot that follows voice commands",
        "A simple alarm clock",
        "A ruler"
      ],
      correctAnswer: "A robot that follows voice commands"
    },
    {
      id: 3,
      text: "Which skill is MOST useful for learning AI?",
      options: [
        "Sleeping",
        "Curiosity & problem-solving",
        "Dancing",
        "Memorizing definitions"
      ],
      correctAnswer: "Curiosity & problem-solving"
    },
    {
      id: 4,
      text: "True or False: “AI can learn from data just like humans learn from experience.”",
      options: [
        "True",
        "False"
      ],
      correctAnswer: "True"
    },
    {
      id: 5,
      text: "Which AI tool do students often use today?",
      options: [
        "AI that writes essays",
        "AI that makes pizza",
        "AI that paints your house",
        "AI that drives school buses"
      ],
      correctAnswer: "AI that writes essays"
    }
  ]
};

export const ADULT_QUIZ: QuizConfig = {
  title: "AI Quiz for Professionals",
  description: "Real-world AI applications for business.",
  eventDate: "January 10th",
  themeColor: "bg-[#120f38]",
  accentColor: "text-white", 
  questions: [
    {
      id: 1,
      text: "What is machine learning primarily used for?",
      options: [
        "Making websites",
        "Finding patterns in data",
        "Creating hardware",
        "Fixing servers"
      ],
      correctAnswer: "Finding patterns in data"
    },
    {
      id: 2,
      text: "Which of the following is a real-life example of AI in business?",
      options: [
        "Excel formulas",
        "Email auto-suggestions",
        "Fax machines",
        "Barcode scanners"
      ],
      correctAnswer: "Email auto-suggestions"
    },
    {
      id: 3,
      text: "What is a “prompt” in generative AI?",
      options: [
        "An AI error",
        "The instruction you give to an AI model",
        "A programming language",
        "A type of dataset"
      ],
      correctAnswer: "The instruction you give to an AI model"
    },
    {
      id: 4,
      text: "True or False: “AI automation can speed up tasks but still requires human oversight.”",
      options: [
        "True",
        "False"
      ],
      correctAnswer: "True"
    },
    {
      id: 5,
      text: "Which industry is adopting AI the fastest?",
      options: [
        "Construction",
        "Retail & e-commerce",
        "Carpentry",
        "Painting services"
      ],
      correctAnswer: "Retail & e-commerce"
    }
  ]
};
