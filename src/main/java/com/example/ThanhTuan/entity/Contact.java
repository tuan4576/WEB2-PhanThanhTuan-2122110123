package com.example.ThanhTuan.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="contacts")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor


public class Contact {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    

    @ManyToOne
    @JoinColumn(name="user_id",nullable = false)
    private User user;

    @Column(nullable=false)
    private String name;

    @Lob
    @Column(nullable=false, columnDefinition="TEXT")
    private String content;


    @CreationTimestamp
    @Column(updatable = false, nullable = false)
    private LocalDateTime createdAt;
}
