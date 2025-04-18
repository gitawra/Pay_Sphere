package com.tawratech.creditInformation;

import com.tawratech.creditInformation.CardRepository.UserRepository;
import com.tawratech.creditInformation.Entity.Role;
import com.tawratech.creditInformation.Entity.User;
import com.tawratech.creditInformation.config.AdminVerificationProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;

@SpringBootApplication
@EnableConfigurationProperties(AdminVerificationProperties.class)
public class  CreditInformationApplication implements CommandLineRunner {

	@Autowired
	private UserRepository userRepository;

	public static void main(String[] args) {
		SpringApplication.run(CreditInformationApplication.class, args);
	}

	@Override
	public void run(String... args) {
		// Check if there are any users with the ADMIN role
		List<User> adminAccounts = userRepository.findByRole(Role.ADMIN);

		// If no admin accounts exist, create a default admin account
		if (adminAccounts.isEmpty()) {
			User user = new User();
			user.setEmail("sanshay0125@gmail.com");
			user.setFullName("admin");
			user.setRole(Role.ADMIN);
			user.setPassword(new BCryptPasswordEncoder().encode("admin"));
			userRepository.save(user);
			System.out.println("Default admin account created.");
		} else {
			System.out.println("Admin accounts already exist.");
		}
	}
}
