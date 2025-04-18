package com.tawratech.creditInformation.CardRepository;

import com.tawratech.creditInformation.Entity.Role;
import com.tawratech.creditInformation.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByRole(Role role);
}
