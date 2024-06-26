package com.exam.examserver.controller;

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
import org.springframework.web.bind.annotation.RestController;

import com.exam.examserver.models.exam.Category;
import com.exam.examserver.service.CategoryService;

@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {
    
    @Autowired
    private CategoryService categoryService;

    // add category
    @PostMapping("/{instituteId}")
    public ResponseEntity<?> addCategory(@RequestBody Category category, @PathVariable Long instituteId) {
        Category category1 = this.categoryService.addCategory(category, instituteId);
        return ResponseEntity.ok(category1);
    }

    // get category
    @GetMapping("/{instituteId}/{categoryId}")
    public Category getCategory(@PathVariable("instituteId") Long instituteId, @PathVariable("categoryId") Long categoryId) {
        return this.categoryService.getCategory(categoryId, instituteId);
    }

    // get all categories
    @GetMapping("/{instituteId}")
    public ResponseEntity<?> getCategories(@PathVariable Long instituteId) {
        return ResponseEntity.ok(this.categoryService.getCategories(instituteId));
    }

    // Update category
    @PutMapping("/")
    public Category updateCategory(@RequestBody Category category) {
        return this.categoryService.updateCategory(category);
    }

    // delete category
    @DeleteMapping("/{instituteId}/{categoryId}")
    public void deleteCategory(@PathVariable("instituteId") Long instituteId, @PathVariable("categoryId") Long categoryId) {
        this.categoryService.deleteCategory(categoryId, instituteId);
    }
}
