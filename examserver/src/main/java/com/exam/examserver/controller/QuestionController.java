package com.exam.examserver.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.exam.examserver.models.User;
import com.exam.examserver.models.exam.Question;
import com.exam.examserver.models.exam.Quiz;
import com.exam.examserver.models.exam.QuizResult;
import com.exam.examserver.service.QuestionService;
import com.exam.examserver.service.QuizService;
import com.exam.examserver.service.UserService;

@RestController
@CrossOrigin("*")
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuizService quizService;

    private Question question;

    @Autowired
    private UserService userService;

    // add question
    @PostMapping("/")
    public ResponseEntity<Question> add(@RequestBody Question question) {
        return ResponseEntity.ok(this.questionService.addQuestion(question));
    }

    // update the question
    @PutMapping("/")
    public ResponseEntity<Question> update(@RequestBody Question question) {
        return ResponseEntity.ok(this.questionService.updateQuestion(question));
    }

    // get all question of any quiz
    @GetMapping("/quiz/{qid}")
    public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable("qid") Long qid) {
        // Quiz quiz = new Quiz();
        // quiz.setqId(qid);
        // Set<Question> questionsOfQuiz =
        // this.questionService.getQuestionsOfQuiz(quiz);

        // return ResponseEntity.ok(questionsOfQuiz);

        Quiz quiz = this.quizService.getQuiz(qid);

        Set<Question> questions = quiz.getQuestions();

        List<Question> list = new ArrayList<>(questions);

        if (list.size() > Integer.parseInt(quiz.getNumberOfQuestions())) {
            list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions() + 1));
        }

        list.forEach((q) -> {
            q.setAnswer("");
        });

        Collections.shuffle(list);
        return ResponseEntity.ok(list);
    }

    // get all question of any quiz for admin
    @GetMapping("/quiz/all/{qid}")
    public ResponseEntity<?> getQuestionsOfQuizAdmin(@PathVariable("qid") Long qid) {
        Quiz quiz = new Quiz();
        quiz.setqId(qid);
        Set<Question> questionsOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);

        return ResponseEntity.ok(questionsOfQuiz);
    }

    // get single question
    @GetMapping("/{quesId}")
    public Question get(@PathVariable("quesId") Long quesId) {
        return this.questionService.getQuestion(quesId);
    }

    // delete question
    @DeleteMapping("/{quesId}")
    public void delete(@PathVariable("quesId") long quesId) {
        this.questionService.deleteQuestion(quesId);
    }

    @PostMapping("/evalQuiz/{username}")
    public ResponseEntity<?> evalQuiz(@RequestBody List<Question> questions, @PathVariable("username") String username) {
        System.out.println("Questios:" + questions);
        System.out.println("Usernama:" + username);
        double marksGot = 0;
        int correctAnswers = 0;
        int attempted = 0;

        for (Question q : questions) {
            question = this.questionService.get(q.getQuesId());

            if (question.getAnswer().equals(q.getGivenAnswer())) {
                correctAnswers++;
                double marksSingle = Double.parseDouble(questions.get(0).getQuiz().getMaxMarks()) / questions.size();
                marksGot += marksSingle;
            }

            if (q.getGivenAnswer() != null) {
                attempted++;
            }
        }

        Quiz quiz = questions.get(0).getQuiz();
        User student = userService.getUser(username);

        QuizResult result = new QuizResult();
        result.setStudent(student);
        result.setQuiz(quiz);
        result.setMarks((int) marksGot);
        result.setTotalMarks(Integer.parseInt(quiz.getMaxMarks()));

        quizService.submitQuizResult(result);

        Map<String, Object> map = Map.of("marksGot", marksGot, "correctAnswers", correctAnswers, "attempted",
                attempted);
        return ResponseEntity.ok(map);
    }
}
