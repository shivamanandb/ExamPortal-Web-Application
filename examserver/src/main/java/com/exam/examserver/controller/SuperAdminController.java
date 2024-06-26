package com.exam.examserver.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.examserver.models.Institute;
import com.exam.examserver.models.Role;
import com.exam.examserver.models.User;
import com.exam.examserver.models.UserRole;
import com.exam.examserver.service.InstituteService;
import com.exam.examserver.service.UserService;

@RestController
@RequestMapping("/super-admin")
@CrossOrigin("*")
public class SuperAdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private InstituteService instituteService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    // Endpoint to create a new institute admin
    @PostMapping("/create-institute-admin")
    public ResponseEntity<?> createInstituteAdmin(@RequestBody User user) {
        try {
            
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword())); 
            
            // Assuming the role ID for Institute Admin is 44
            Role adminRole = new Role(44L, "ADMIN");
            UserRole userRole = new UserRole(user, adminRole);
            Set<UserRole> userRoles = new HashSet<>();
            userRoles.add(userRole);

            User createdUser = userService.createUser(user, userRoles);
            return ResponseEntity.ok("Institute admin created successfully with username: " + createdUser.getUsername());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating institute admin: " + e.getMessage());
        }
    }

    // Endpoint to create a new institute
    @PostMapping("/create-institute")
    public ResponseEntity<?> createInstitute(@RequestBody Institute institute) {
        
        return ResponseEntity.ok(instituteService.addInstitute(institute));
    }

    // Other endpoints for updating, deleting institutes, etc.

    // Endpoint to fetch all institutes
    @GetMapping("/institutes")
    public ResponseEntity<?> getAllInstitutes() {

        List<Institute> list = instituteService.getInstitutes();
        return ResponseEntity.ok(list);
    }

    // Example of more endpoints for super admin functionality

}
