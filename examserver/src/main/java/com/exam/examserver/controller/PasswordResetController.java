package com.exam.examserver.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.exam.examserver.models.User;
import com.exam.examserver.service.PasswordResetService;
import com.exam.examserver.service.UserService;
import java.util.UUID;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/password")
public class PasswordResetController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordResetService passwordResetService;

    @PostMapping("/reset-request")
    public ResponseEntity<?> resetPasswordRequest(@RequestParam("email") String email) {
        Optional<User> userOptional = userService.findByEmail(email);
      
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }
        User user = userOptional.get();
        String token = UUID.randomUUID().toString();

        passwordResetService.createPasswordResetTokenForUser(user, token);
        passwordResetService.sendPasswordResetEmail(user, token);
        return ResponseEntity.ok("Password reset email sent");
    }

    @PostMapping("/reset")
    public ResponseEntity<?> resetPassword(@RequestParam("token") String token,
                                           @RequestParam("password") String password) {
        String result = passwordResetService.validatePasswordResetToken(token);
        if (!"valid".equals(result)) {
            return ResponseEntity.badRequest().body("Invalid or expired token");
        }
        Optional<User> userOptional = passwordResetService.findUserByResetToken(token);
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }
        User user = userOptional.get();
        passwordResetService.changeUserPassword(user, password);
        return ResponseEntity.ok("Password has been reset successfully");
    }
}