package com.exam.examserver.service;

import java.util.Set;
import com.exam.examserver.models.exam.Category;

public interface CategoryService {
    
    Category addCategory(Category category, Long instituteId);
    
    Category updateCategory(Category category);

    Set<Category> getCategories(Long instituteId);
    
    Category getCategory(Long categoryId, Long instituteId);
    
    void deleteCategory(Long categoryId, Long instituteId);
}
