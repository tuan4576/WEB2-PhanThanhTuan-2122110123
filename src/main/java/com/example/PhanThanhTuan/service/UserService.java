package com.example.PhanThanhTuan.service;

import java.util.List;
import java.util.Optional;

import com.example.PhanThanhTuan.domain.User;

public interface UserService {
    Optional<User> getUserById(Long id);
    List<User> getAllUsers();
    User createUser(User user);
    User updateUser(Long id, User user);
    void deleteUser(Long id);
    
}