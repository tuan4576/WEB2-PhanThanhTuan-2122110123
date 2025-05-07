package com.example.PhanThanhTuan.service;

import com.example.PhanThanhTuan.domain.Brand;

import java.util.List;
import java.util.Optional;

public interface BrandService {
    Optional<Brand> getBrandById(Long id);
    List<Brand> getAllBrands();
    Brand createBrand(Brand brand);
    Brand updateBrand(Long id, Brand brand);
    void deleteBrand(Long id);
}
