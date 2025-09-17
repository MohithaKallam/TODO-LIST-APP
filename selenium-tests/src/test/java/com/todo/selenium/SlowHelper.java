package com.todo.utils;

import org.openqa.selenium.WebElement;

public class SlowHelper {
    private static final int SHORT_DELAY = 1000;  // 1 second
    private static final int LONG_DELAY = 3000;   // 3 seconds
    private static final int TYPE_DELAY = 300;    // 0.3 second per character

    public static void pauseShort() {
        sleep(SHORT_DELAY);
    }

    public static void pauseLong() {
        sleep(LONG_DELAY);
    }

    public static void typeSlowly(WebElement element, String text) {
        element.clear();
        for (char c : text.toCharArray()) {
            element.sendKeys(String.valueOf(c));
            sleep(TYPE_DELAY);
        }
    }

    private static void sleep(int millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
