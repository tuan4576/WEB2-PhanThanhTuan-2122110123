package com.example.PhanThanhTuan.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.PhanThanhTuan.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}