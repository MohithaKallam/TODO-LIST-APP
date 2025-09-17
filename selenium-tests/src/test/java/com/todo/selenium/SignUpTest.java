package com.todo.selenium;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;

import java.util.Random;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class SignUpTest extends BaseTest {

    // Helper method to generate random strings
    private String randomString(int length) {
        String chars = "abcdefghijklmnopqrstuvwxyz";
        StringBuilder sb = new StringBuilder();
        Random rand = new Random();
        for (int i = 0; i < length; i++) {
            sb.append(chars.charAt(rand.nextInt(chars.length())));
        }
        return sb.toString();
    }

    // Helper method to generate random email
    private String randomEmail() {
        return randomString(5) + "@gmail.com";
    }

    // Helper method to generate random 10-digit mobile
    private String randomMobile() {
        Random rand = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 10; i++) {
            sb.append(rand.nextInt(10));
        }
        return sb.toString();
    }

    @Test
    public void testSignUpRandomUser() {
        // Generate random user data
        String name = "User" + randomString(3);
        String email = randomEmail();
        String mobile = randomMobile();
        String password = "Pass@123"; // meets your validation rules

        // Open signup page
        driver.get("http://localhost:3000/signup");

        // Check heading
        WebElement heading = driver.findElement(By.tagName("h2"));
        assertTrue(heading.getText().contains("Create an Account"), "Sign Up page should have heading");

        // Fill the form
        driver.findElement(By.name("name")).sendKeys(name);
        driver.findElement(By.name("email")).sendKeys(email);
        driver.findElement(By.name("mobile")).sendKeys(mobile);
        driver.findElement(By.name("password")).sendKeys(password);
        driver.findElement(By.name("confirmPassword")).sendKeys(password);

        // Submit form
        driver.findElement(By.tagName("button")).click();

        // Wait for browser alert and validate
        wait.until(ExpectedConditions.alertIsPresent());
        String alertText = driver.switchTo().alert().getText();
        assertTrue(alertText.contains("Signup successful"), "Expected signup success alert");
        driver.switchTo().alert().accept();

        System.out.println("✅ Signup test passed for: " + email);
    }
}
