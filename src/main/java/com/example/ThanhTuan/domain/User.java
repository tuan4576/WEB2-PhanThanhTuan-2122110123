package com.example.ThanhTuan.domain;

import java.time.LocalDateTime;

public class User {
    private Long id;
    private String name;
    private String email;
    private String password;
    private String phone;
    private String avatar;
    private Long role_id;

    private Integer status;
    private Boolean emailVerified;
    
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
}
