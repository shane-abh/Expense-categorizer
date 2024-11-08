package com.expensecategorizer.expenses;

import com.expensecategorizer.expenses.controller.ExpenseCategorizationController;
import com.expensecategorizer.expenses.model.ExpenseRequest;
import com.expensecategorizer.expenses.model.ExpenseResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.boot.test.context.SpringBootTest;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ExpensesApplicationTests {
	@Mock
	private ChatClient chatClient;

	@Mock
	private ChatClient.Builder mockBuilder;

	private ExpenseCategorizationController expenseCategorizationController;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);

		// Configure the builder to return the mock chat client
		when(mockBuilder.defaultSystem(anyString())).thenReturn(mockBuilder);
		when(mockBuilder.build()).thenReturn(chatClient);

		// Initialize the controller with the mock builder
		expenseCategorizationController = new ExpenseCategorizationController(mockBuilder);
	}

	@Test
	void getCategory_ShouldReturnCorrectCategory_WhenChatClientSucceeds() {
		ExpenseRequest request = new ExpenseRequest("Pizza", 25.0);

		// Mock the chain of calls for the chat client
		ChatClient.ChatClientRequestSpec requestSpecMock = mock(ChatClient.ChatClientRequestSpec.class);
		ChatClient.CallResponseSpec responseMock = mock(ChatClient.CallResponseSpec.class);

		// Setting up the mock behavior
		when(chatClient.prompt()).thenReturn(requestSpecMock);
		when(requestSpecMock.user(request.getDescription())).thenReturn(requestSpecMock);
		when(requestSpecMock.call()).thenReturn(responseMock);
		when(responseMock.content()).thenReturn("Food");

		// Invoke the controller method
		ExpenseResponse response = expenseCategorizationController.getCategory(request);

		// Verify the response
		assertEquals("Food", response.getCategory());

	}

	@Test
	void getCategory_ShouldReturnUnknown_WhenChatClientThrowsException() {
		ExpenseRequest request = new ExpenseRequest("Gable", 50.0);

		// Mock the chain of calls for the chat client
		ChatClient.ChatClientRequestSpec requestSpecMock = mock(ChatClient.ChatClientRequestSpec.class);
		ChatClient.CallResponseSpec responseMock = mock(ChatClient.CallResponseSpec.class);

		// Setting up the mock behavior to throw an exception
		when(chatClient.prompt()).thenReturn(requestSpecMock);
		when(requestSpecMock.user(request.getDescription())).thenReturn(requestSpecMock);
		when(requestSpecMock.call()).thenThrow(new RuntimeException("API Error")); // Simulate the exception

		// Invoke the controller method
		ExpenseResponse response = expenseCategorizationController.getCategory(request);

		// Verify that the fallback category "Unknown" is set
		assertEquals("Unknown", response.getCategory());
	}

}
