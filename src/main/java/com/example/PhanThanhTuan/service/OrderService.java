package com.example.PhanThanhTuan.service;

import com.example.PhanThanhTuan.domain.Order;


import java.util.List;

public interface OrderService {
    List<Order> getAllOrders();
    Order getOrderById(int id);
    Order saveOrder(Order order);
    void deleteOrder(int id);
    // 👇 Thêm dòng này
    List<Order> getOrdersByUserId(Long userId);
}