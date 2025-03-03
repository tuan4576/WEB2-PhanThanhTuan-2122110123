package com.example.ThanhTuan;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@SpringBootApplication
@RestController
@RequestMapping("/api/products")
public class Hello {
    @GetMapping
	String getProduct() {
		return "Get product";
	}
	@PostMapping
	public String postProduct() {

		return "Post product";
	}
	@PutMapping("/{id}")
	public String putProduct(@PathVariable int id) {		
		return "Da cap nhat san pham so " + id;
	}
	@DeleteMapping("/{id}")
	public String deleteProduct(@PathVariable int id ){
		return "Da xoa san pham so " + id ;
	}

}
    