package com.example.ThanhTuan.domain;

import java.time.LocalDateTime;

public class Address {
    public Long id;
    public Long user_id;      
    public String firstname;  
    public String lastname;    
    public String address;       
    public String city;        
    public String country;     
    // public String zip;          
    public String telephone;  
    public LocalDateTime created_at;
    public LocalDateTime updated_at;
}
