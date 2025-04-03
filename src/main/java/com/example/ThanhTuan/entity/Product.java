package com.example.ThanhTuan.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="product")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor

public class Product 
{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false,unique=true)
    private String name;

    @Column(nullable=false)
    private String image;
    
    @Column(nullable=false)
    private double price;
    
    @Lob
    @Column(nullable=false, columnDefinition="TEXT")
    private String description;

    @Column(nullable=false)
    private Integer stockQuantity;

    @Column(nullable=false)
    private Long sold;

    // @ManyToOne
    // @JoinColumn(name="brand_id", nullable=false)
    // private Brand brand;

    // private String target;

    @Column(nullable=false)
    private Boolean status;

    @ManyToOne
    @JoinColumn(name="user_id",nullable=false)
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ShoppingCart> shoppingcarts;

    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Wishlist> wishlists;

    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews;

    // @JsonIgnore
    // @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    // private List<ProductSale> productSales;

    // @JsonIgnore
    // @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    // private List<ProductRoot> productRoots;
    @OneToOne(mappedBy = "product", cascade = CascadeType.ALL)
    private ProductRoot productRoot;

    @OneToOne(mappedBy = "product", cascade = CascadeType.ALL)
    private ProductSale productSale;
    
    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderDetail> orderDetails;
    
    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductCategory> productCategorys;

    @CreationTimestamp
    @Column(updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
