package com.example.ThanhTuan.domain;

import java.time.LocalDateTime;

    public class Product {
        private Long id;
        private String name;
        private String image;
        private double price;
        private String description;
        private Integer stock_quantity;
        private Long sold; // số lượng đã bán
        private Long brand_id;
        private String target;// nhu cầu sử dụng
        private Integer status;
        private LocalDateTime created_at;
        private LocalDateTime updated_at;
    }
