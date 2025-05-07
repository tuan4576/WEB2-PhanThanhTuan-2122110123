package com.example.PhanThanhTuan.service;

import java.util.List;

import com.example.PhanThanhTuan.domain.Cart;

public interface CartService {
    List<Cart> findByUserId(Long userId);
    Cart getCartById(Long id); // thêm dòng này
    Cart addToCart(Cart cart);
    List<Cart> findAll(); 
    Cart updateQuantity(Long id, Integer quantity);
    void removeFromCart(Long id);
}