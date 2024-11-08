package com.expensecategorizer.expenses.model;

public class ExpenseRequest {
    String description;
    double amount;

    public ExpenseRequest(String description, double amount) {
        this.description = description;
        this.amount = amount;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
