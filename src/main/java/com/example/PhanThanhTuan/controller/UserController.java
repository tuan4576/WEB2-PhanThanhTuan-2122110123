package com.example.PhanThanhTuan.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.PhanThanhTuan.domain.User;
import com.example.PhanThanhTuan.Jwt.JwtUtil;
import com.example.PhanThanhTuan.dto.Login;
import com.example.PhanThanhTuan.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    // Lưu tạm token đăng ký để xác minh khi login
    private final Map<String, String> registrationTokens = new HashMap<>();

    @Autowired
    public UserController(UserService userService, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody User user) {
        // Nếu là admin thì cấp role admin
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("ROLE_USER"); // Mặc định là USER nếu không có role
        }
    
        User savedUser = userService.createUser(user);
        String token = jwtUtil.generateToken(savedUser.getEmail());
    
        // Lưu token để kiểm tra khi login
        registrationTokens.put(savedUser.getEmail(), token);
    
        Map<String, String> response = new HashMap<>();
        response.put("message", "Đăng ký thành công");
        response.put("email", savedUser.getEmail());
        return ResponseEntity.ok(response);
    }
//     @PostMapping("/login")
// public ResponseEntity<?> loginUser(
//     @RequestBody Login loginRequest,
//     @RequestHeader(value = "Authorization", required = false) String authHeader
// ) {
//     // Kiểm tra nếu có token trong Authorization header
//     if (authHeader != null && authHeader.startsWith("Bearer ")) {
//         String token = authHeader.substring(7); // Lấy token từ header (sau "Bearer ")
        
//         // Xác thực token
//         String email = jwtUtil.extractSubject(token);
//         if (email != null && !email.isEmpty()) {
//             // Nếu token hợp lệ và email tồn tại trong token, trả lại thông báo đã đăng nhập
//             return ResponseEntity.ok(Map.of("message", "Bạn đã đăng nhập từ trước", "email", email));
//         }
//     }

//     // Nếu không có token hợp lệ, tiếp tục kiểm tra thông tin đăng nhập (email, password)
//     List<User> allUsers = userService.getAllUsers();
//     Optional<User> userOptional = allUsers.stream()
//         .filter(u -> u.getEmail().equals(loginRequest.getEmail()))
//         .findFirst();

//     if (userOptional.isPresent()) {
//         User user = userOptional.get();

//         // Kiểm tra mật khẩu
//         if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
//             // Tạo mới token nếu đăng nhập thành công
//             String newToken = jwtUtil.generateToken(user.getEmail());

//             Map<String, String> response = new HashMap<>();
//             response.put("message", "Đăng nhập thành công");
//             response.put("token", newToken);
//             response.put("email", user.getEmail());

//             return ResponseEntity.ok(response);
//         } else {
//             // Mật khẩu không đúng
//             return ResponseEntity.status(401).body(Map.of("message", "Mật khẩu không đúng"));
//         }
//     } else {
//         // Email không tồn tại
//         return ResponseEntity.status(401).body(Map.of("message", "Email không tồn tại"));
//     }
// }

    // @PostMapping("/login")
    // public ResponseEntity<?> loginUser(@RequestBody Login loginRequest) {
    // Optional<User> userOptional = userService.getAllUsers().stream()
    //     .filter(u -> u.getEmail().equals(loginRequest.getEmail()))
    //     .findFirst();

    // if (userOptional.isPresent()) {
    //     User user = userOptional.get();

    //     // Kiểm tra mật khẩu
    //     if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
    //         String newToken = jwtUtil.generateToken(user.getEmail());

    //         Map<String, String> response = new HashMap<>();
    //         response.put("message", "Đăng nhập thành công");
    //         response.put("token", newToken);
    //             response.put("email", user.getEmail());
    //             response.put("userId", String.valueOf(user.getId()));  // Add userId here
    
    //             return ResponseEntity.ok(response);
    //         }
    //     }
    
    //     return ResponseEntity.status(401).body(Map.of("message", "Email hoặc mật khẩu không đúng"));
    // }
    @PostMapping("/login")
public ResponseEntity<?> loginUser(@RequestBody Login loginRequest) {
    Optional<User> userOptional = userService.getAllUsers().stream()
        .filter(u -> u.getEmail().equals(loginRequest.getEmail()))
        .findFirst();

    if (userOptional.isPresent()) {
        User user = userOptional.get();

        // Kiểm tra mật khẩu
        if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            String newToken = jwtUtil.generateToken(user.getEmail());

            Map<String, String> response = new HashMap<>();
            response.put("message", "Đăng nhập thành công");
            response.put("token", newToken);
            response.put("email", user.getEmail());
            response.put("userId", String.valueOf(user.getId()));

            // 👇 thêm role từ chuỗi
            response.put("role", user.getRole());

            return ResponseEntity.ok(response);
        }
    }

    return ResponseEntity.status(401).body(Map.of("message", "Email hoặc mật khẩu không đúng"));
}

    // GET tất cả người dùng
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();  // Lấy tất cả người dùng từ service
        return ResponseEntity.ok(users);  // Trả về danh sách người dùng
    }

    // GET thông tin người dùng theo ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.getUserById(id);  // Tìm người dùng theo ID
        return user.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.notFound().build());  // Trả về 404 nếu không tìm thấy
    }

    // PUT cập nhật thông tin người dùng
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        return userService.getUserById(id).map(existingUser -> {
            existingUser.setName(userDetails.getName());
            existingUser.setEmail(userDetails.getEmail());
            existingUser.setPhone(userDetails.getPhone());
            User updatedUser = userService.updateUser(id, existingUser);
            return ResponseEntity.ok(updatedUser);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // DELETE xóa người dùng
    @DeleteMapping("/{id}")
public ResponseEntity<?> deleteUser(@PathVariable Long id) {
    Optional<User> userOptional = userService.getUserById(id);
    if (!userOptional.isPresent()) {
        return ResponseEntity.notFound().build();
    }
    User user = userOptional.get();
    if ("ADMIN".equalsIgnoreCase(user.getRole())) {
        return ResponseEntity.status(403).body(Map.of("message", "Không thể xóa tài khoản của admin."));
    }
    userService.deleteUser(id);
    return ResponseEntity.noContent().build();
}
}
