package com.worthwise.service;

import com.worthwise.dao.UserDAO;
import com.worthwise.entities.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserDAO userDAO;

    @Mock
    private EmailService emailService;

    @Mock
    private OneTimePasswordService oneTimePasswordService;

    @InjectMocks
    private UserService userService;

    private final PasswordEncoder encoder = new BCryptPasswordEncoder();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createUser_ValidUser_ReturnsCreatedUser() {
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("TestPassword123");
        user.setPhoneNumber("0712345678");

        when(userDAO.save(user)).thenReturn(user);

        User createdUser = userService.createUser(user);

        assertNotNull(createdUser);
        assertEquals(user.getEmail(), createdUser.getEmail());
        assertTrue(encoder.matches("TestPassword123", createdUser.getPassword()));
        assertEquals(user.getPhoneNumber(), createdUser.getPhoneNumber());
        assertNotNull(createdUser.getDateCreated());
        verify(userDAO, times(1)).save(user);
    }

    @Test
    void createUser_InvalidEmail_ThrowsException() {
        User user = new User();
        user.setEmail("invalidemail");
        user.setPassword("TestPassword123");
        user.setPhoneNumber("0712345678");

        assertThrows(IllegalArgumentException.class, () -> userService.createUser(user));
        verify(userDAO, never()).save(user);
    }

    @Test
    void createUser_InvalidPassword_ThrowsException() {
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("weak");
        user.setPhoneNumber("0712345678");

        assertThrows(IllegalArgumentException.class, () -> userService.createUser(user));
        verify(userDAO, never()).save(user);
    }

    @Test
    void createUser_ExistingUser_ThrowsException() {
        User existingUser = new User();
        existingUser.setEmail("test@example.com");

        User newUser = new User();
        newUser.setEmail("test@example.com");

        when(userDAO.findByEmail(newUser.getEmail())).thenReturn(existingUser);

        assertThrows(IllegalArgumentException.class, () -> userService.createUser(newUser));
        verify(userDAO, never()).save(newUser);
    }

    @Test
    void getAllUsers_ReturnsListOfUsers() {
        // Mocking Data
        User user1 = new User();
        user1.setUserId(1L);
        User user2 = new User();
        user2.setUserId(2L);

        when(userDAO.findAll()).thenReturn(List.of(user1, user2));

        // Testing
        List<User> users = userService.getAllUsers();
        assertEquals(2, users.size());
        assertEquals(user1.getUserId(), users.get(0).getUserId());
        assertEquals(user2.getUserId(), users.get(1).getUserId());
        verify(userDAO, times(1)).findAll();
    }

    @Test
    void getUserById_ValidUserId_ReturnsUser() {
        // Mocking Data
        User user = new User();
        user.setUserId(1L);

        when(userDAO.findById(1L)).thenReturn(Optional.of(user));

        // Testing
        User retrievedUser = userService.getUserById(1L);
        assertNotNull(retrievedUser);
        assertEquals(user.getUserId(), retrievedUser.getUserId());
        verify(userDAO, times(1)).findById(1L);
    }

    @Test
    void getUserById_InvalidUserId_ReturnsNull() {
        when(userDAO.findById(2L)).thenReturn(Optional.empty());

        User retrievedUser = userService.getUserById(2L);
        assertNull(retrievedUser);
        verify(userDAO, times(1)).findById(2L);
    }

    @Test
    void getUserByEmail_ValidEmail_ReturnsUser() {
        // Mocking Data
        User user = new User();
        user.setEmail("test@example.com");

        when(userDAO.findByEmail("test@example.com")).thenReturn(user);

        // Testing
        User retrievedUser = userService.getUserByEmail("test@example.com");
        assertNotNull(retrievedUser);
        assertEquals(user.getEmail(), retrievedUser.getEmail());
        verify(userDAO, times(1)).findByEmail("test@example.com");
    }

    @Test
    void getUserByEmail_InvalidEmail_ReturnsNull() {
        when(userDAO.findByEmail("nonexistent@example.com")).thenReturn(null);

        User retrievedUser = userService.getUserByEmail("nonexistent@example.com");
        assertNull(retrievedUser);
        verify(userDAO, times(1)).findByEmail("nonexistent@example.com");
    }

    @Test
    void updateUser_ValidUserIdAndUser_ReturnsUpdatedUser() {
        // Mocking Data
        User existingUser = new User();
        existingUser.setUserId(1L);

        User updatedUser = new User();
        updatedUser.setUserId(1L);

        when(userDAO.findById(1L)).thenReturn(Optional.of(existingUser));
        when(userDAO.save(existingUser)).thenReturn(existingUser);

        // Testing
        User result = userService.updateUser(1L, updatedUser);
        assertNotNull(result);
        assertEquals(existingUser.getUserId(), result.getUserId());
        verify(userDAO, times(1)).findById(1L);
        verify(userDAO, times(1)).save(existingUser);
    }

    @Test
    void updateUser_InvalidUserId_ReturnsNull() {
        when(userDAO.findById(2L)).thenReturn(Optional.empty());

        User result = userService.updateUser(2L, new User());
        assertNull(result);
        verify(userDAO, times(1)).findById(2L);
        verify(userDAO, never()).save(any(User.class));
    }
}

