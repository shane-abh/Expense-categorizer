package com.expensecategorizer.expenses;
import com.expensecategorizer.expenses.controller.ExpenseCategorizationController;
import com.expensecategorizer.expenses.controller.ExpenseFileController;
import com.expensecategorizer.expenses.model.ExpenseResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import java.io.IOException;
import java.nio.file.Files;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
public class ExpenseFileControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Mock
    private ExpenseCategorizationController categorizationController;

    @InjectMocks
    private ExpenseFileController expenseFileController; // Assuming you have an ExpenseFileController

    @Autowired
    private ResourceLoader resourceLoader;



    @Test
    void uploadExpenses_ShouldReturnOk_WhenFileIsUploadedSuccessfully() throws Exception {
        // Load the file from the resources folder
        Resource resource = resourceLoader.getResource("classpath:expense_data.csv");
        MockMultipartFile file = new MockMultipartFile(
                "file",
                resource.getFilename(),
                MediaType.TEXT_PLAIN_VALUE,
                Files.readAllBytes(resource.getFile().toPath())
        );


        // Perform the file upload
        mockMvc.perform(multipart("/upload-expenses")
                        .file(file))
                .andExpect(status().isOk());
    }

    @Test
    void uploadExpenses_ShouldReturnOk_WhenFileIsUploadedSuccessfully_Multithreaded() throws Exception {
        // Load the file from the resources folder
        Resource resource = resourceLoader.getResource("classpath:expense_data.csv");
        MockMultipartFile file = new MockMultipartFile(
                "file",
                resource.getFilename(),
                MediaType.TEXT_PLAIN_VALUE,
                Files.readAllBytes(resource.getFile().toPath())
        );


        // Perform the file upload
        mockMvc.perform(multipart("/upload-expenses-multithreaded")
                        .file(file))
                .andExpect(status().isOk());
    }

    @Test
    void uploadExpenses_ShouldReturnBadRequest_WhenFileIsEmpty() throws Exception {
        // Create an empty mock file
        MockMultipartFile emptyFile = new MockMultipartFile("file", "", MediaType.TEXT_PLAIN_VALUE, new byte[0]);

        // Perform the file upload
        mockMvc.perform(multipart("/upload-expenses")
                        .file(emptyFile))
                .andExpect(status().isBadRequest());
    }
}
