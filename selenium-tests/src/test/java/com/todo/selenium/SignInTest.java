package com.todo.selenium;

import com.mongodb.client.MongoCollection;
import com.todo.utils.MongoHelper;
import com.todo.utils.SlowHelper;
import org.bson.Document;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class SignInTest extends BaseTest {

    @Test
    public void testSignInWithAllUsers() {
        MongoCollection<Document> users = MongoHelper.getUsersCollection();

        for (Document user : users.find()) {
            String email = user.getString("email");
            String password = user.getString("password");

            System.out.println("🔹 Testing login for: " + email);

            // Go to sign-in page
            driver.get("http://localhost:3000/signin");
            SlowHelper.pauseLong(); // wait to visually see the page

            // Locate form fields
            WebElement emailInput = wait.until(ExpectedConditions.presenceOfElementLocated(By.name("email")));
            SlowHelper.pauseShort();

            WebElement passwordInput = driver.findElement(By.name("password"));
            SlowHelper.pauseShort();

            WebElement loginButton = driver.findElement(By.tagName("button"));
            SlowHelper.pauseShort();

            // Slowly type email & password
            SlowHelper.typeSlowly(emailInput, email);
            SlowHelper.typeSlowly(passwordInput, password);

            SlowHelper.pauseLong(); // wait before click
            loginButton.click();

            SlowHelper.pauseLong(); // wait after click to see transition

            // Validate that login worked (dashboard loaded)
            boolean onDashboard = wait.until(ExpectedConditions.or(
                ExpectedConditions.urlContains("dashboard"),
                ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(),'Dashboard')]"))
            ));

            assertTrue(onDashboard, "Login should succeed for: " + email);

            // Clean session for next user
            driver.manage().deleteAllCookies();
            SlowHelper.pauseLong(); // wait before testing next user
        }

        MongoHelper.closeConnection();
    }
}
