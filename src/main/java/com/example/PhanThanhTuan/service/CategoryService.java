package com.example.PhanThanhTuan.service;
import com.example.PhanThanhTuan.domain.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryService {
    List<Category> getAllCategories();
    Optional<Category> getCategoryById(Long id);
    Category createCategory(Category category);
    Category updateCategory(Long id, Category category); // 👈 thêm hàm update
    void deleteCategory(Long id);
}
