package com.exam.examserver.service;

import java.util.List;
import java.util.Set;

import com.exam.examserver.models.exam.Category;
import com.exam.examserver.models.exam.Quiz;
import com.exam.examserver.models.exam.QuizResult;

public interface QuizService {
    
    public Quiz addQuiz(Quiz quiz, Long adminId);

    public Quiz updateQuiz(Quiz quiz);

    public Set<Quiz> getQuizzes();

    public Quiz getQuiz(Long quizId);

    public void deleteQuiz(Long quizId);

    public List<Quiz> getQuizzesOfCategory(Category category);

    public List<Quiz> getActiveQuizzes();

    public List<Quiz> getActiveQuizzesOfCategory(Category c);

    public List<Quiz> getQuizzesForInstitute(Long instituteId);

    List<Quiz> getQuizzesByInstituteId(Long instituteId);

    public List<QuizResult> getQuizResults(Long quizId);

    public void submitQuizResult(QuizResult result);

    public List<QuizResult> getQuizResultsByInstitute(Long instituteId);

    public List<QuizResult> getQuizResultsDetailed(Long quizId);
    
}
