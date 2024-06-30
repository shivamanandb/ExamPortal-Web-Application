package com.exam.examserver.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.examserver.models.exam.Category;
import com.exam.examserver.models.exam.Quiz;
import com.exam.examserver.models.exam.QuizResult;
import com.exam.examserver.repository.QuizRepository;
import com.exam.examserver.repository.QuizResultRepository;
import com.exam.examserver.service.QuizService;

@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuizResultRepository quizResultRepository;

    @Override
    public Quiz addQuiz(Quiz quiz, Long adminId) {
        return this.quizRepository.save(quiz);
    }

    @Override
    public Quiz updateQuiz(Quiz quiz) {
        return this.quizRepository.save(quiz);
    }

    @Override
    public Set<Quiz> getQuizzes() {
        return new HashSet<>(this.quizRepository.findAll());
    }

    @Override
    public Quiz getQuiz(Long quizId) {
        return this.quizRepository.findById(quizId).get();
    }

    @Override
    public List<Quiz> getQuizzesByInstituteId(Long instituteId) {
        return this.quizRepository.findByCategory_InstituteId(instituteId);
    }

    @Override
    public void deleteQuiz(Long quizId) {
        this.quizRepository.deleteById(quizId);
    }

    @Override
    public List<Quiz> getQuizzesForInstitute(Long instituteId) {
        // Ensure filtering by institute via category
        return quizRepository.findByCategory_InstituteIdAndActive(instituteId, true);
    }

    @Override
    public List<Quiz> getQuizzesOfCategory(Category category) {
        return this.quizRepository.findByCategory(category);
    }

    // get active quizzes

    @Override
    public List<Quiz> getActiveQuizzes() {
        return this.quizRepository.findByActive(true);
    }

    @Override
    public List<Quiz> getActiveQuizzesOfCategory(Category c) {
        return this.quizRepository.findByCategoryAndActive(c, true);
    }

     public void submitQuizResult(QuizResult result) {
        quizResultRepository.save(result);
    }

    public List<QuizResult> getQuizResults(Long quizId) {
        Quiz quiz = quizRepository.findById(quizId).orElseThrow(() -> new RuntimeException("Quiz not found"));
        List<QuizResult> results = quizResultRepository.findByQuizOrderByMarksDescTotalMarksDesc(quiz);
        assignRanks(results);
        return results;
    }

    private void assignRanks(List<QuizResult> results) {
        int rank = 1;
        for (QuizResult result : results) {
            result.setRank(rank++);
        }
    }

    @Override
    public List<QuizResult> getQuizResultsByInstitute(Long instituteId) {
        return quizResultRepository.findByQuiz_Category_InstituteIdOrderByQuiz_qIdDesc(instituteId);
    }

    @Override
    public List<QuizResult> getQuizResultsDetailed(Long quizId) {
        Quiz quiz = quizRepository.findById(quizId).orElseThrow(() -> new RuntimeException("Quiz not found"));
        List<QuizResult> results = quizResultRepository.findByQuizOrderByMarksDescTotalMarksDesc(quiz);
        assignRanks(results);
        return results;
    }
    
}
