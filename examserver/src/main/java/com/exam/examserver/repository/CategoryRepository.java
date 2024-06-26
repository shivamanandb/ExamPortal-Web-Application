package com.exam.examserver.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.examserver.models.exam.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    
    List<Category> findByInstituteId(Long instituteId);
}
