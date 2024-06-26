package com.exam.examserver.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.examserver.models.User;

public interface UserRepository extends JpaRepository<User, Long> {

    public User findByUsername(String username);
    List<User> findByInstituteId(Long instituteId);
    Optional<User> findByEmail(String email);
}
