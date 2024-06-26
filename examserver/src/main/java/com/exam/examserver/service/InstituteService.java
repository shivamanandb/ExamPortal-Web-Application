package com.exam.examserver.service;

import com.exam.examserver.models.Institute;

import java.util.List;

public interface InstituteService {

    Institute addInstitute(Institute institute);

    Institute updateInstitute(Institute institute);

    List<Institute> getInstitutes();

    Institute getInstitute(Long instituteId);

    void deleteInstitute(Long instituteId);
}
