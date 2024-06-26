package com.exam.examserver.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.exam.examserver.models.User;
import com.exam.examserver.models.UserRole;

public interface UserService {
    
    // creating user
    public User createUser(User user, Set<UserRole> userRoles) throws Exception;

    // get user by username
    public User getUser(String username);

    // delete user by id
    public void deleteUser(Long userId);

    Optional<User> findByEmail(String email);

    List<User> getStudentsByInstituteId(Long instituteId);
}
