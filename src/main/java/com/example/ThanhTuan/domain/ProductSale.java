package com.example.ThanhTuan.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ProductSale {
    private Long id;
    private Long product_id;
    private Long price_sale;
    private LocalDate daybegin;
    private LocalDate dayend;
    private Integer status;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
}
