package com.example.PhanThanhTuan.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import com.example.PhanThanhTuan.domain.Order;
import com.example.PhanThanhTuan.repository.CartRepository;
import com.example.PhanThanhTuan.repository.OrderRepository;
import com.example.PhanThanhTuan.service.OrderService;

import jakarta.transaction.Transactional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartRepository cartRepository;

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order getOrderById(int id) {
        return orderRepository.findById(id).orElse(null);
    }
    @Override
    @Transactional
    public Order saveOrder(Order order) {
        Order savedOrder = orderRepository.save(order);

        Long userId = order.getUser().getId();
        cartRepository.deleteByUserId(userId); // ✅ dùng instance để gọi
        return savedOrder;
    }
    @Override
    public void deleteOrder(int id) {
        orderRepository.deleteById(id);
    }
    @Override
    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }
}