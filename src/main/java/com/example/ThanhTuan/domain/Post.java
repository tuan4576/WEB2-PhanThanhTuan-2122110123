package com.example.ThanhTuan.domain;

import java.time.LocalDateTime;

public class Post {
    public Long id;
    public String linkImage;
    public String title;
    public String content;
    public Long user_id;
    public LocalDateTime createdAt;
    public LocalDateTime updatedAt;
}
