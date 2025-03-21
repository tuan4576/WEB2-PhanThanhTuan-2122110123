package com.example.ThanhTuan.domain;

import java.time.LocalDateTime;

public class Order {
    private Long id;
    private LocalDateTime daybook;
    private String odercode;
    private Double totalprice;
    private Long user_id;
    private String address;
    private String status; // trạng thái pending, shipped, completed, cancelled
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
}