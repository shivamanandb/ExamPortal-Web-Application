package com.exam.examserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.examserver.models.UserRole;

public interface UserRoleRepository extends JpaRepository<UserRole,Long> {
    
    public void deleteByUserRoleId(Long id);
}
