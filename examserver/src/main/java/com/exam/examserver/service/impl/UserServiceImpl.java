package com.exam.examserver.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.examserver.helper.UserFoundException;
import com.exam.examserver.models.User;
import com.exam.examserver.models.UserRole;
import com.exam.examserver.repository.RoleRepository;
import com.exam.examserver.repository.UserRepository;
import com.exam.examserver.repository.UserRoleRepository;
import com.exam.examserver.service.UserService;

import jakarta.transaction.Transactional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    // creating user
    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {

        User local = this.userRepository.findByUsername(user.getUsername());

        if (local != null) {
            // System.out.println("User is already there !!");
            throw new UserFoundException("User already present !!");
        } else {
            // user create
            for (UserRole ur : userRoles) {
                roleRepository.save(ur.getRole());
            }

            user.getUserRoles().addAll(userRoles);
            local = this.userRepository.save(user);
        }
        return local;
    }
    
    // getting user by username
    @Override
    public User getUser(String username) {
        
        return this.userRepository.findByUsername(username);
    }

    // deleting user by userId
    @Override
@Transactional
public void deleteUser(Long userId) {
    Optional<User> userOptional = userRepository.findById(userId);
    if (userOptional.isPresent()) {
        User user = userOptional.get();
        
        // Remove the user from the institute
        if (user.getInstitute() != null) {
            user.getInstitute().getUsers().remove(user);
            user.setInstitute(null);
        }
        
        // Remove UserRole entries
        Set<UserRole> userRoles = user.getUserRoles();
        userRoleRepository.deleteAll(userRoles);
        
        // Clear the user's roles
        user.getUserRoles().clear();
        
        // Delete the user
        userRepository.delete(user);
    }
}

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<User> getStudentsByInstituteId(Long instituteId) {
        return userRepository.findByInstituteId(instituteId);
    }

}
