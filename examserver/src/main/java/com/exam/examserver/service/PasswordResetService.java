package com.exam.examserver.service;

import java.util.Optional;

import com.exam.examserver.models.User;

public interface PasswordResetService {
    
    public void createPasswordResetTokenForUser(User user, String token);

    public void sendPasswordResetEmail(User user, String token);

    public String validatePasswordResetToken(String token);

    public void changeUserPassword(User user, String password);

    Optional<User> findUserByResetToken(String resetToken);
}
