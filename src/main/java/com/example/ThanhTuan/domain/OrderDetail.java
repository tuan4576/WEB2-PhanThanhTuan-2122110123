package com.example.ThanhTuan.domain;

import java.time.LocalDateTime;

public class OrderDetail {
    public Long id;
    public Long order_id;
    public Long product_id;
    public Integer quantity;
    public Double price;
    public LocalDateTime created_at;
    public LocalDateTime updated_at;
}
