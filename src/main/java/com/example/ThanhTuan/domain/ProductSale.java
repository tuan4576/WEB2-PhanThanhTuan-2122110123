package com.example.ThanhTuan.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ProductSale {
    public Long id;
    public Long product_id;
    public Long price_sale;
    public LocalDate daybegin;
    public LocalDate dayend;
    public Integer status;
    public LocalDateTime created_at;
    public LocalDateTime updated_at;
}
