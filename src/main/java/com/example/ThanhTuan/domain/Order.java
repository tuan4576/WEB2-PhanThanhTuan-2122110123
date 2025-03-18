package com.example.ThanhTuan.domain;

import java.time.LocalDateTime;

public class Order {
    public Long id;
    public LocalDateTime daybook;
    public String odercode;
    public Double totalprice;
    public Long user_id;
    public String address;
    public String status; // trạng thái pending, shipped, completed, cancelled
    public LocalDateTime created_at;
    public LocalDateTime updated_at;
}