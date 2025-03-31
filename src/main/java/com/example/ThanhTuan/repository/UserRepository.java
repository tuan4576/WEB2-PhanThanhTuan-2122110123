package com.example.ThanhTuan.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ThanhTuan.entity.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Object> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
