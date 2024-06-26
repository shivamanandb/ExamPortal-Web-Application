package com.exam.examserver;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.exam.examserver.models.Role;
import com.exam.examserver.models.User;
import com.exam.examserver.models.UserRole;
import com.exam.examserver.service.UserService;

@SpringBootApplication
@EnableScheduling
public class ExamserverApplication implements CommandLineRunner {

	// @Autowired
	// private UserService userService;
	
	public static void main(String[] args) {
		SpringApplication.run(ExamserverApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Starting code");

		// User user= new User();

		// user.setFirstName("Shivam");
		// user.setLastName("Anand");
		// user.setUsername("shivamanandb");
		// user.setPassword("shivamanandb");
		// user.setEmail("shivamanandb@gmail.com");
		// user.setProfile("default.png");
		
		// Role role = new Role();
		// role.setRoleId(44L);
		// role.setRoleName("ADMIN");

		// Set<UserRole> userRoleSet = new HashSet<>();
		// UserRole userRole = new UserRole();
		// userRole.setRole(role);
		// userRole.setUser(user);
		// userRoleSet.add(userRole);

		// User user1 = this.userService.createUser(user, userRoleSet);
		// System.out.println(user1.getUsername());
	}
}
