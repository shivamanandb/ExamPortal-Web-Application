package com.exam.examserver.service.impl;

import java.util.LinkedHashSet;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.exam.examserver.models.exam.Category;
import com.exam.examserver.models.Institute;
import com.exam.examserver.repository.CategoryRepository;
import com.exam.examserver.repository.InstituteRepository;
import com.exam.examserver.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private InstituteRepository instituteRepository;

    @Override
    public Category addCategory(Category category, Long instituteId) {
        Institute institute = instituteRepository.findById(instituteId)
                                .orElseThrow(() -> new RuntimeException("Institute not found"));
        category.setInstitute(institute);
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Set<Category> getCategories(Long instituteId) {
        Institute institute = instituteRepository.findById(instituteId)
                                .orElseThrow(() -> new RuntimeException("Institute not found"));
        return new LinkedHashSet<>(institute.getCategories());
    }

    @Override
    public Category getCategory(Long categoryId, Long instituteId) {
        Institute institute = instituteRepository.findById(instituteId)
                                .orElseThrow(() -> new RuntimeException("Institute not found"));
        return institute.getCategories().stream()
                        .filter(category -> category.getCid().equals(categoryId))
                        .findFirst()
                        .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    @Override
    public void deleteCategory(Long categoryId, Long instituteId) {
        Institute institute = instituteRepository.findById(instituteId)
                                .orElseThrow(() -> new RuntimeException("Institute not found"));
        Category category = institute.getCategories().stream()
                                     .filter(c -> c.getCid().equals(categoryId))
                                     .findFirst()
                                     .orElseThrow(() -> new RuntimeException("Category not found"));
        institute.getCategories().remove(category);
        categoryRepository.delete(category);
    }
}
