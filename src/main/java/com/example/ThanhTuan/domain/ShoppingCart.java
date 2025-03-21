package com.example.ThanhTuan.domain;

import java.time.LocalDateTime;

public class ShoppingCart {
    private Long id;
    private Long user_id; 
    private Long product_id;
    private Integer quantity;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
}
