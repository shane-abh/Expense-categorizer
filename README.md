
## Smart Finance: AI-Powered Expense Categorization

## Overview
Smart Finance addresses a common problem: categorizing expenses based on descriptions and amounts without hardcoded rules or manually defined keywords. This project leverages the power of machine learning, specifically through a large language model (LLM) with Llama 3.2b, to automate the categorization process, making it accurate and adaptable.

With Smart Finance, you can categorize expenses individually or in bulk via a simple API. This tool is ideal for users and businesses looking to streamline expense management through AI-driven categorization. The backend is built with Java Spring, integrating Spring AI for the machine learning component, while the frontend uses React with ShadCN for a seamless user experience.

![image](https://github.com/user-attachments/assets/82b4feaf-e392-4cd0-94f4-73752debdce6)


## Features
- Single Expense Categorization: Enter expense descriptions and amounts to categorize expenses one by one.
- Bulk Categorization: Upload a CSV file with multiple expenses for batch categorization, saving time and ensuring consistency.
- AI-Powered: Uses Llama 3.2b for natural language processing, enabling the system to categorize based on context rather than static keywords.
- User-Friendly Interface: Built with React and ShadCN to provide a smooth and responsive user experience.

## Tech Stack
- Backend: Java Spring, Spring AI
- Frontend: React, ShadCN
- Testing: Mockito, JUnit

## Installation and Setup
### Prerequisites
- Java: Version 17 or higher
- Maven: For building and managing Java dependencies
- Node.js and npm: For the React frontend


#### 1. Clone the Repository
Start by cloning the repository:
```bash
git clone https://github.com/shane-abh/expense-categorizer.git
cd expense-categorizer  
```
#### 2. Backend Setup (Java Spring API)
Navigate to the Backend Directory:

```bash
cd api
```
#### Configure the application.properties:

```bash
spring.application.name=expenses
spring.ai.ollama.chat.model=llama3.2
```

#### Build and Run the API: Use Maven to build and start the Spring Boot application.

```bash
mvn clean install
mvn spring-boot:run
The API server should now be running at http://localhost:8080.
```

#### 3. Frontend Setup (React Client)
Navigate to the Frontend Directory:

```bash
cd client
```

Install Dependencies: Use npm to install the required packages for the React app:

```bash
npm install
```

4. Testing (Optional)
Backend Tests: Run unit and integration tests using Maven:

```bash
mvn test
```


