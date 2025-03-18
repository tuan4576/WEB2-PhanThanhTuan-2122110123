package com.example.ThanhTuan.domain;

import java.time.LocalDateTime;

public class ShoppingCart {
    public Long id;
    public Long user_id; 
    public Long product_id;
    public Integer quantity;
    public LocalDateTime created_at;
    public LocalDateTime updated_at;
}
