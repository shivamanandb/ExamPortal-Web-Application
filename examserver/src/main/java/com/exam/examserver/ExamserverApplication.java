package com.exam.examserver;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.exam.examserver.models.Role;
import com.exam.examserver.models.User;
import com.exam.examserver.models.UserRole;
import com.exam.examserver.service.UserService;

@SpringBootApplication
@EnableScheduling
@EnableTransactionManagement
public class ExamserverApplication implements CommandLineRunner {

	@Autowired
	private UserService userService;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public static void main(String[] args) {
		SpringApplication.run(ExamserverApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// System.out.println("Starting code");

		// User user= new User();

		// user.setFirstName("Shivam");
		// user.setLastName("Anand");
		// user.setUsername("shivamanandb");
		// user.setPassword(bCryptPasswordEncoder.encode("shivamanandb"));
		// user.setEmail("shivamanandb@gmail.com");
		// user.setProfile(null);
		
		// Role role = new Role();
		// role.setRoleId(46L);
		// role.setRoleName("SUPER_USER");

		// Set<UserRole> userRoleSet = new HashSet<>();
		// UserRole userRole = new UserRole();
		// userRole.setRole(role);
		// userRole.setUser(user);
		// userRoleSet.add(userRole);

		// User user1 = this.userService.createUser(user, userRoleSet);
		// // System.out.println(user1.getUsername());
	}
}
