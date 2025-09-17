package com.todo.selenium;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class HomePageTest extends BaseTest {

    @Test
    public void testHomePageElements() {
        driver.get("http://localhost:3000/home");

        // ✅ Check logo
        WebElement logo = wait.until(ExpectedConditions.presenceOfElementLocated(By.className("logo")));
        assertTrue(logo.getText().contains("TASKMATE"), "Logo should contain TASKMATE");

        // ✅ Check Sign In link
        WebElement signInLink = driver.findElement(By.linkText("Sign In"));
        assertTrue(signInLink.isDisplayed(), "Sign In link should be visible");

        // ✅ Check Sign Up link
        WebElement signUpLink = driver.findElement(By.linkText("Sign Up"));
        assertTrue(signUpLink.isDisplayed(), "Sign Up link should be visible");

        // ✅ Check main heading
        WebElement heading = driver.findElement(By.tagName("h1"));
        assertTrue(heading.getText().contains("Welcome to TaskMate"), "Heading should be visible");

        // ✅ Check features section
        WebElement features = driver.findElement(By.className("features-section"));
        assertTrue(features.getText().contains("Create, edit, and delete tasks"), "Features should be listed");

        // ✅ Check CTA section
        WebElement cta = driver.findElement(By.className("cta-section"));
        assertTrue(cta.getText().contains("Get Started Now!"), "CTA should be visible");
    }

    @Test
    public void testNavigationLinks() {
        driver.get("http://localhost:3000/home");

        // Click Sign In
        WebElement signInLink = wait.until(ExpectedConditions.elementToBeClickable(By.linkText("Sign In")));
        signInLink.click();
        wait.until(ExpectedConditions.urlContains("/signin"));
        assertTrue(driver.getCurrentUrl().contains("/signin"), "Should navigate to Sign In page");

        // Navigate back to Home
        driver.navigate().back();
        wait.until(ExpectedConditions.urlContains("/home"));

        // Click Sign Up
        WebElement signUpLink = wait.until(ExpectedConditions.elementToBeClickable(By.linkText("Sign Up")));
        signUpLink.click();
        wait.until(ExpectedConditions.urlContains("/signup"));
        assertTrue(driver.getCurrentUrl().contains("/signup"), "Should navigate to Sign Up page");
    }

    @Test
    public void testSignInAndSignUpPages() {
        driver.get("http://localhost:3000/home");

        // Go to Sign In page
        WebElement signInLink = wait.until(ExpectedConditions.elementToBeClickable(By.linkText("Sign In")));
        signInLink.click();
        wait.until(ExpectedConditions.urlContains("/signin"));

        // ✅ Flexible heading check
        WebElement signInHeading = driver.findElement(By.cssSelector("h1, h2, h3"));
        String signInText = signInHeading.getText().toLowerCase();
        assertTrue(signInText.contains("sign in"),
                "Expected heading to contain 'Sign In', but found: " + signInText);

        driver.navigate().back();
        wait.until(ExpectedConditions.urlContains("/home"));

        // Go to Sign Up page
        WebElement signUpLink = wait.until(ExpectedConditions.elementToBeClickable(By.linkText("Sign Up")));
        signUpLink.click();
        wait.until(ExpectedConditions.urlContains("/signup"));

        // ✅ Flexible heading check for multiple possibilities
        WebElement signUpHeading = driver.findElement(By.cssSelector("h1, h2, h3"));
        String signUpText = signUpHeading.getText();
        assertTrue(
                signUpText.contains("Sign Up") ||
                signUpText.contains("signup") ||
                signUpText.contains("Create an Account"),
                "Expected heading to contain 'Sign Up' or 'Signup' or 'Create Account', but found: " + signUpText
        );
    }
}
