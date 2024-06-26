package com.exam.examserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.exam.examserver.models.Institute;

@Repository
public interface InstituteRepository extends JpaRepository<Institute, Long> {
    
}
