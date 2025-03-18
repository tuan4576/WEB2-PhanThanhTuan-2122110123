package com.example.ThanhTuan.domain;

import java.time.LocalDateTime;

public class Review {
    public Long id;
    public Long user_id;
    public Long product_id;
    public Integer rating; 
    public String comment; 
    public LocalDateTime created_at;
    public LocalDateTime update_at;
}
