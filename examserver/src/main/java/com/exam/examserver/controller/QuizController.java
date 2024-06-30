package com.exam.examserver.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.exam.examserver.models.exam.Category;
import com.exam.examserver.models.exam.Quiz;
import com.exam.examserver.models.exam.QuizResult;
import com.exam.examserver.service.QuizService;

@RestController
@CrossOrigin("*")
@RequestMapping("/quiz")
public class QuizController {
    
    @Autowired
    private QuizService quizService;
    private Category category;

    // add quiz service
    @PostMapping("/")
    public ResponseEntity<Quiz> createQuiz(@RequestBody Quiz quiz, @RequestParam(required = false) Long adminId) {
        quizService.addQuiz(quiz, adminId);
        return ResponseEntity.status(HttpStatus.CREATED).body(quiz);
    }
    

    // update quiz
    @PutMapping("/")
    public ResponseEntity<Quiz> update(@RequestBody Quiz quiz) {
        return ResponseEntity.ok(this.quizService.updateQuiz(quiz));
    }

    // get quiz
    @GetMapping("/")
    public ResponseEntity<?> quizzes() {
        return ResponseEntity.ok(this.quizService.getQuizzes());
    }

    // Get quizzes by institute ID
    @GetMapping("/institute/all/{instituteId}")
    public ResponseEntity<?> getQuizzesByInstituteId(@PathVariable Long instituteId) {
        return ResponseEntity.ok(this.quizService.getQuizzesByInstituteId(instituteId));
    }

    // get Quiz
    @GetMapping("/institute/{instituteId}")
    public ResponseEntity<List<Quiz>> getQuizzes(@PathVariable Long instituteId) {
        List<Quiz> quizzes = quizService.getQuizzesForInstitute(instituteId);
        return ResponseEntity.ok(quizzes);
    }

    // get single quiz
    @GetMapping("/{qid}")
    public Quiz quiz(@PathVariable("qid") Long qid) {
        return this.quizService.getQuiz(qid);
    }

    // delete the quiz
    @DeleteMapping("/{qid}") 
    public void delete(@PathVariable("qid") Long qid) {
        this.quizService.deleteQuiz(qid);
    } 

    // get Quizzes using Category id
    @GetMapping("/category/{cid}") 
        public List<Quiz> getQuizzesOfCategory(@PathVariable("cid") Long cid){
        category = new Category();
        category.setCid(cid);
        return this.quizService.getQuizzesOfCategory(category);
    }

    // get active Quizzes
    @GetMapping("/active")
    public List<Quiz> getActiveQuizzes() {
        return this.quizService.getActiveQuizzes();
    }
     
    // get active Quizzes of category
    @GetMapping("/category/active/{cid}")
    public List<Quiz> getActiveQuizzesOfCategory(@PathVariable("cid") Long cid) {
    Category category = new Category();
    category.setCid(cid);
    return this.quizService.getActiveQuizzesOfCategory(category);
    }

     @GetMapping("/{quizId}/results")
    public ResponseEntity<List<QuizResult>> getQuizResults(@PathVariable Long quizId) {
        List<QuizResult> results = quizService.getQuizResults(quizId);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/institute/{instituteId}/results")
    public ResponseEntity<List<QuizResult>> getQuizResultsByInstitute(@PathVariable Long instituteId) {
        List<QuizResult> results = quizService.getQuizResultsByInstitute(instituteId);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/{quizId}/results-detailed")
    public ResponseEntity<List<QuizResult>> getQuizResultsDetailed(@PathVariable Long quizId) {
        List<QuizResult> results = quizService.getQuizResultsDetailed(quizId);
        return ResponseEntity.ok(results);
    }

}
