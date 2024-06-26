package com.exam.examserver.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.examserver.models.Institute;
import com.exam.examserver.service.InstituteService;

@RestController
@RequestMapping("/institute")
@CrossOrigin("*")
public class InstituteController {
    
    @Autowired
    private InstituteService instituteService;

    @DeleteMapping("/{instituteId}")
    public ResponseEntity<Void> deleteInstitute(@PathVariable("instituteId") Long instituteId) {
        try {
            instituteService.deleteInstitute(instituteId);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get institute by ID
    @GetMapping("/access/{instituteId}")
    public ResponseEntity<Institute> getInstituteById(@PathVariable("instituteId") Long instituteId) {
        Institute institute = instituteService.getInstitute(instituteId);
        if (institute != null) {
            return ResponseEntity.ok(institute);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
