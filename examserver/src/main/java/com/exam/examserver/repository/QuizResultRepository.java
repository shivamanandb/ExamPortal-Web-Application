package com.exam.examserver.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.examserver.models.exam.Quiz;
import com.exam.examserver.models.exam.QuizResult;

public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {
    List<QuizResult> findByQuizOrderByMarksDescTotalMarksDesc(Quiz quiz);
    List<QuizResult> findByQuiz_Category_InstituteIdOrderByQuiz_qIdDesc(Long instituteId);
}