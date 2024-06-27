package com.exam.examserver.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.exam.examserver.models.PasswordResetToken;
import com.exam.examserver.models.User;
import com.exam.examserver.repository.PasswordResetTokenRepository;
import com.exam.examserver.repository.UserRepository;
import com.exam.examserver.service.PasswordResetService;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class PasswordResetServiceImpl implements PasswordResetService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordResetTokenRepository tokenRepository;
    
    @Autowired
    private JavaMailSender mailSender;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    public void createPasswordResetTokenForUser(User user, String token) {
        PasswordResetToken myToken = new PasswordResetToken();
        myToken.setUser(user);
        myToken.setToken(token);
        myToken.setExpiryDate(LocalDateTime.now().plusHours(1));
        tokenRepository.save(myToken);
    }

    public void sendPasswordResetEmail(User user, String token) {
        String recipientAddress = user.getEmail();
        String subject = "Password Reset Request";
        String confirmationUrl = "https://examportal-web-application-front-end.vercel.app/reset-password?token=" + token;
        String message = "To reset your password, please click the link below:\n" + confirmationUrl;

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(recipientAddress);
        email.setSubject(subject);
        email.setText(message);
        mailSender.send(email);
    }


    public String validatePasswordResetToken(String token) {
        Optional<PasswordResetToken> optionalPassToken = tokenRepository.findByToken(token);
        
        if (optionalPassToken.isEmpty()) {
            return "invalidToken";
        }
        
        PasswordResetToken passToken = optionalPassToken.get();
        
        if (passToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            return "expired";
        }
        
        return "valid";
    }

    public void changeUserPassword(User user, String password) {
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }

    @Override
    public Optional<User> findUserByResetToken(String resetToken) {
        Optional<PasswordResetToken> tokenOptional = tokenRepository.findByToken(resetToken);
        return tokenOptional.map(PasswordResetToken::getUser);
    }

    @Scheduled(fixedRate = 3600000) // Run every hour
    public void deleteExpiredTokens() {
        tokenRepository.deleteAllExpiredSince(LocalDateTime.now());
    }
}