package com.example.PhanThanhTuan.repository;

import com.example.PhanThanhTuan.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);
    List<Order> getOrdersByUserId(Long userId);

}