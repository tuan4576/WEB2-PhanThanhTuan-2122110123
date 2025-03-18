package com.example.ThanhTuan.domain;

import java.time.LocalDateTime;

    public class Product {
        public Long id;
        public String name;
        public String image;
        public double price;
        public String description;
        public Integer stock_quantity;
        public Long sold; // số lượng đã bán
        public Long brand_id;
        public String target;// nhu cầu sử dụng
        public Integer status;
        public LocalDateTime created_at;
        public LocalDateTime updated_at;
    }
