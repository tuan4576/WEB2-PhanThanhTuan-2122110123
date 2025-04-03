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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name= "user")
@NoArgsConstructor
@AllArgsConstructor

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false, length=10)
    private String name;

    @Column(nullable=false,unique = true,length=150)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(length=15)
    private String phone;

    private String avatar;

    private Boolean status;// Trạng thái tài khoản (0: bị khóa, 1: hoạt động,...)

    
    @Column(name= "email_verified",nullable=false)
    private Boolean emailVerified;
    
    @ManyToOne
    @JoinColumn(name = "role_id",nullable=false)
    private Role role;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ShoppingCart> shoppingcarts;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Order> orders;

    @JsonIgnore 
    @OneToMany(mappedBy = "user", cascade =  CascadeType.ALL,orphanRemoval = true)
    private List<Wishlist> wishlist;
    
    @JsonIgnore 
    @OneToMany(mappedBy = "user", cascade =  CascadeType.ALL,orphanRemoval = true)
    private List<Product> products;

    @JsonIgnore 
    @OneToMany(mappedBy = "user", cascade =  CascadeType.ALL,orphanRemoval = true)
    private List<Address> addresses;

    @JsonIgnore 
    @OneToMany(mappedBy = "user", cascade =  CascadeType.ALL,orphanRemoval = true)
    private List<Review> reviews;

    @JsonIgnore 
    @OneToMany(mappedBy = "user", cascade =  CascadeType.ALL,orphanRemoval = true)
    private List<Post> posts;

    @JsonIgnore 
    @OneToMany(mappedBy = "user", cascade =  CascadeType.ALL,orphanRemoval = true)
    private List<Payment> payments;
    
    @JsonIgnore 
    @OneToMany(mappedBy = "user", cascade =  CascadeType.ALL,orphanRemoval = true)
    private List<Contact> contacts;
    
    @JsonIgnore 
    @OneToMany(mappedBy = "user", cascade =  CascadeType.ALL,orphanRemoval = true)
    private List<Banner> banners;

    @CreationTimestamp
    @Column(updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
