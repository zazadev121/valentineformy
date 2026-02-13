import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Question {
  text: string;
  options: string[];
  correctIndex: number; // Index of the correct answer (or -1 if all are correct :))
  unlockedImage: string;
  unlockedMessage: string;
}

@Component({
  selector: 'app-love-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './love-quiz.component.html',
  styleUrl: './love-quiz.component.scss'
})
export class LoveQuizComponent {
  currentQuestionIndex = 0;
  showReward = false;
  quizCompleted = false;

  questions: Question[] = [
    {
      text: 'ვინ არის ყველაზე ლამაზი გოგო სამყაროში?',
      options: ['ანჯელინა ჯოლი', 'მონიკა ბელუჩი', 'მარიამ უკლება ❤️', 'სკარლეტ იოჰანსონი'],
      correctIndex: 2,
      unlockedImage: 'assets/images/her.jpg',
      unlockedMessage: 'რა თქმა უნდა, შენ! შენ ყველას ჯობიხარ! 😍'
    },
    {
      text: 'რამდენად ძალიან მიყვარხარ?',
      options: ['ცოტათი', 'საკმაოდ', 'ძალიან', 'უსასრულოდ და კიდევ უფრო მეტად ♾️'],
      correctIndex: 3,
      unlockedImage: 'assets/images/marriiii.jpg',
      unlockedMessage: 'ჩემი სიყვარული შენდამი უსასრულოა! ❤️'
    },
    {
      text: 'რა არის ჩემი საყვარელი ადგილი?',
      options: ['პარიზი', 'შენთან ჩახუტება 🫂', 'ზღვა', 'მთები'],
      correctIndex: 1,
      unlockedImage: 'assets/images/love.jpg',
      unlockedMessage: 'შენთან ყოფნა არის ჩემი ბედნიერება! 🏠'
    },
    {
      text: 'რას ნიშნავ შენ ჩემთვის?',
      options: ['მეგობარს', 'შეყვარებულს', 'მთელ სამყაროს 🌍', 'უბრალოდ ადამიანს'],
      correctIndex: 2,
      unlockedImage: 'assets/images/myyy.jpg',
      unlockedMessage: 'შენ ხარ ჩემი სამყარო, ჩემი ჰაერი და ჩემი სიცოცხლე! ✨'
    },
    {
      text: 'იქნები სულ ჩემთან?',
      options: ['კი ❤️', 'რათქმაუნდა კი! 💖', 'აბა რას ვიზამ! 💕', 'სულ სულ! 💍'],
      correctIndex: -1, // All are correct!
      unlockedImage: 'assets/images/mari.jpg',
      unlockedMessage: 'მიყვარხარ სამუდამოდ! ჩვენი ამბავი არასდროს დამთავრდება! 💑'
    }
  ];

  selectedOption: number | null = null;
  isCorrect: boolean | null = null;
  
  images = [
    'assets/images/her.jpg',
    'assets/images/marriiii.jpg',
    'assets/images/love.jpg',
    'assets/images/myyy.jpg',
    'assets/images/mari.jpg',
  ];

  checkAnswer(index: number) {
    if (this.showReward) return;

    this.selectedOption = index;
    const currentQ = this.questions[this.currentQuestionIndex];

    // Check if correct (or special case -1 where all are correct)
    if (currentQ.correctIndex === -1 || index === currentQ.correctIndex) {
      this.isCorrect = true;
      setTimeout(() => {
        this.showReward = true;
      }, 500);
    } else {
      this.isCorrect = false;
      // Shake effect or feedback could go here
    }
  }

  nextQuestion() {
    this.showReward = false;
    this.selectedOption = null;
    this.isCorrect = null;

    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.quizCompleted = true;
    }
  }

  restartQuiz() {
    this.currentQuestionIndex = 0;
    this.quizCompleted = false;
    this.showReward = false;
    this.selectedOption = null;
    this.isCorrect = null;
  }
}
