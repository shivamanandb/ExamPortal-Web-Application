package com.exam.examserver.service.impl;

import com.exam.examserver.models.Institute;
import com.exam.examserver.repository.InstituteRepository;
import com.exam.examserver.service.InstituteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstituteServiceImpl implements InstituteService {

    @Autowired
    private InstituteRepository instituteRepository;

    @Override
    public Institute addInstitute(Institute institute) {
        return instituteRepository.save(institute);
    }

    @Override
    public Institute updateInstitute(Institute institute) {
        return instituteRepository.save(institute);
    }

    @Override
    public List<Institute> getInstitutes() {
        return instituteRepository.findAll();
    }

    @Override
    public Institute getInstitute(Long instituteId) {
        return instituteRepository.findById(instituteId)
                .orElseThrow(() -> new RuntimeException("Institute not found with id: " + instituteId));
    }

    @Override
    public void deleteInstitute(Long instituteId) {
        instituteRepository.deleteById(instituteId);
    }
}
