package com.expensecategorizer.expenses.controller;

import com.expensecategorizer.expenses.model.ExpenseRequest;
import com.expensecategorizer.expenses.model.ExpenseResponse;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
public class ExpenseCategorizationController {

    private final ChatClient chatClient;

    @Autowired
    public ExpenseCategorizationController(ChatClient.Builder builder) {
        this.chatClient = builder
                .defaultSystem("You are a helpful AI assistant that helps me to categorize expenses based on description, into these categories: Food, Shopping, and Transport. Your job is to only return the category.")
                .build();
    }

    @PostMapping("/categorize")
    public ExpenseResponse getCategory(@RequestBody ExpenseRequest request) {
        String description = request.getDescription();
        String category;

        try {
            category = chatClient.prompt().user(description).call().content();
        } catch (Exception e) {
            category = "Unknown";  // Fallback in case of an error
        }

        ExpenseResponse expenseResponse = new ExpenseResponse();
        expenseResponse.setCategory(category);
        expenseResponse.setAmount(request.getAmount());
        expenseResponse.setDescription(description);

        return expenseResponse;
    }
}
