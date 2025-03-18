package com.example.ThanhTuan.domain;

import java.time.LocalDateTime;

public class User {
    public Long id;
    public String name;
    public String email;
    public String password;
    public String phone;
    public String avatar;
    public Long role_id;

    public Integer status;
    public Boolean emailVerified;
    
    public LocalDateTime created_at;
    public LocalDateTime updated_at;
}
