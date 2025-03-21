package com.example.ThanhTuan.domain;

import java.time.LocalDateTime;

public class OrderDetail {
    private Long id;
    private Long order_id;
    private Long product_id;
    private Integer quantity;
    private Double price;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
}
