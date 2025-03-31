package com.example.ThanhTuan.service.impl;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.ThanhTuan.entity.User;
import com.example.ThanhTuan.repository.UserRepository;
import com.example.ThanhTuan.service.UserService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor

public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override 
    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }
    
    

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User updateUser(User user) {
        User existingUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        existingUser.setName(user.getName());
        existingUser.setEmail(user.getEmail());
        existingUser.setPhone(user.getPhone());
        existingUser.setAvatar(user.getAvatar());
        existingUser.setStatus(user.getStatus());
        existingUser.setEmailVerified(user.getEmailVerified());

        if (user.getRole() != null) {
            existingUser.setRole(user.getRole());
        }

        // Không cập nhật password nếu không được gửi lên
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            existingUser.setPassword(user.getPassword());  // Nên hash lại mật khẩu ở đây
        }

        existingUser.setUpdatedAt(LocalDateTime.now()); // Cập nhật thời gian sửa đổi

        return userRepository.save(existingUser);
    }


    @Override
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }
}
