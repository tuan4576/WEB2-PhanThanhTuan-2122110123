package com.example.ThanhTuan.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="product_category")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor

public class ProductCategory {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="product_id",nullable = false)
    private Product product;

    @ManyToOne
    @JoinColumn(name="category_id",nullable=false)
    private Category category;
}
