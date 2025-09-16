package com.todo.selenium;

import com.mongodb.client.MongoCollection;
import com.todo.utils.MongoHelper;
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

            driver.get("http://localhost:3000/signin");

            WebElement emailInput = wait.until(ExpectedConditions.presenceOfElementLocated(By.name("email")));
            WebElement passwordInput = driver.findElement(By.name("password"));
            WebElement loginButton = driver.findElement(By.tagName("button"));

            emailInput.clear();
            emailInput.sendKeys(email);

            passwordInput.clear();
            passwordInput.sendKeys(password);

            loginButton.click();

            boolean onDashboard = wait.until(ExpectedConditions.or(
                ExpectedConditions.urlContains("dashboard"),
                ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(),'Dashboard')]"))
            ));

            assertTrue(onDashboard, "Login should succeed for: " + email);

            driver.manage().deleteAllCookies();
        }

        MongoHelper.closeConnection();
    }
}
