package com.exam.examserver.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.examserver.models.exam.Category;
import com.exam.examserver.models.exam.Quiz;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

    public List<Quiz> findByCategory(Category category);
    public List<Quiz> findByActive(Boolean b);
    public List<Quiz> findByCategoryAndActive(Category c, Boolean b);
    List<Quiz> findByCategory_InstituteIdAndActive(Long instituteId, Boolean b);
    List<Quiz> findByCategory_InstituteId(Long instituteId);
    
}
