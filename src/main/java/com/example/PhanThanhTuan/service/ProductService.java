package com.example.PhanThanhTuan.service;

import com.example.PhanThanhTuan.domain.Brand;
import com.example.PhanThanhTuan.domain.Category;
import com.example.PhanThanhTuan.domain.Product;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<Product> getAllProducts();
    Optional<Product> getProductById(Long id);
    List<Product> getProductsByCategory(Long categoryId);
    List<Product> getProductsByBrand(Long brandId);
    List<Product> getProductsByCategoryAndBrand(Long categoryId, Long brandId);
    Product createProduct(Product product, Category category, Brand brand, MultipartFile image);
    Product updateProduct(Long id, Product productDetails, Category category, Brand brand, MultipartFile image);
    void deleteProduct(Long id);
    Optional<Product> findById(Long id);
}