package com.expensecategorizer.expenses.controller;
import com.expensecategorizer.expenses.model.ExpenseRequest;
import com.expensecategorizer.expenses.model.ExpenseResponse;
import jakarta.annotation.PreDestroy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.*;


@RestController
public class ExpenseFileController {

    private static final Logger logger = LoggerFactory.getLogger(ExpenseFileController.class);

    @Autowired
    private final ExpenseCategorizationController categorizationController;
    private final ExecutorService executorService;

    @Autowired
    public ExpenseFileController(ExpenseCategorizationController categorizationController, ExecutorService executorService) {
        this.categorizationController = categorizationController;
        this.executorService = executorService;
    }

    @PostMapping("/upload-expenses")
    public ResponseEntity<List<ExpenseResponse>> uploadExpenses(@RequestParam("file") MultipartFile file) {
        long startTime = System.currentTimeMillis();
        List<ExpenseResponse> categorizedExpenses = new ArrayList<>();

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.singletonList(new ExpenseResponse("Invalid", 0.0, "File is empty")));
        }

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            reader.readLine(); // Skip header
            String line;
            while ((line = reader.readLine()) != null) {
                parseAndCategorizeExpense(line, categorizedExpenses);
            }
        } catch (Exception e) {
            logger.error("Error processing expenses in single-threaded mode", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }

        logTimeTaken(startTime, "Single-threaded process");
        return ResponseEntity.ok(categorizedExpenses);
    }

    @PostMapping("/upload-expenses-multithreaded")
    public ResponseEntity<List<ExpenseResponse>> uploadExpensesMultiThreaded(@RequestParam("file") MultipartFile file) {
        long startTime = System.currentTimeMillis();
        List<ExpenseResponse> categorizedExpenses = new ArrayList<>();
        List<Future<ExpenseResponse>> futures = new ArrayList<>();

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.singletonList(new ExpenseResponse("Invalid", 0.0, "File is empty")));
        }

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            reader.readLine(); // Skip header
            String line;
            while ((line = reader.readLine()) != null) {
                submitCategorizationTask(line, futures);
            }

            // Collect results from futures
            for (Future<ExpenseResponse> future : futures) {
                try {
                    categorizedExpenses.add(future.get());
                } catch (Exception e) {
                    logger.error("Error retrieving result from future", e);
                }
            }

        } catch (Exception e) {
            logger.error("Error processing expenses in multithreaded mode", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }

        logTimeTaken(startTime, "Multithreaded process");
        return ResponseEntity.ok(categorizedExpenses);
    }

    @PreDestroy
    public void shutDownExecutorService() {
        executorService.shutdown();
        try {
            if (!executorService.awaitTermination(60, TimeUnit.SECONDS)) {
                logger.warn("Executor service did not terminate in the specified time.");
                executorService.shutdownNow();
            }
        } catch (InterruptedException e) {
            logger.error("Executor shutdown interrupted", e);
            executorService.shutdownNow();
        }
    }

    private void parseAndCategorizeExpense(String line, List<ExpenseResponse> categorizedExpenses) {
        String[] data = line.split(",");
        if (data.length < 2) {
            logger.warn("Skipping line due to invalid format: {}", line);
            return;
        }

        try {
            String description = data[0].trim();
            double amount = Double.parseDouble(data[1].trim());
            ExpenseRequest request = new ExpenseRequest(description, amount);
            categorizedExpenses.add(categorizationController.getCategory(request));
        } catch (Exception e) {
            logger.error("Error parsing or categorizing expense: {}", line, e);
        }
    }

    private void submitCategorizationTask(String line, List<Future<ExpenseResponse>> futures) {
        String[] data = line.split(",");
        if (data.length < 2) {
            logger.warn("Skipping line due to invalid format: {}", line);
            return;
        }

        String description = data[0].trim();
        double amount;
        try {
            amount = Double.parseDouble(data[1].trim());
        } catch (NumberFormatException e) {
            logger.warn("Skipping line due to invalid amount format: {}", line);
            return;
        }

        Callable<ExpenseResponse> task = () -> {
            ExpenseRequest request = new ExpenseRequest(description, amount);
            return categorizationController.getCategory(request);
        };

        Future<ExpenseResponse> future = executorService.submit(task);
        futures.add(future);
    }

    private void logTimeTaken(long startTime, String operationName) {
        long endTime = System.currentTimeMillis();
        long timeTaken = endTime - startTime;
        logger.info("{} took: {} s", operationName, timeTaken / 1000);
    }
}