# CodEco (Code + Eco)
## 2023-2 SKKU Software Engineering Team 3 Project

**CodEco** is a project that aims to calculate the environmental
impact of written software code. A large percentage of carbon emission
comes from computing resources, and this will continue to grow, as
software becomes more demanding for high performance tasks. Our website
calculates the energy resources required to execute a small piece of
software, therefore allowing the user to correctly analyze the code in
an ecological perspective.

We expect users to insert their Java code and calculate the carbon
footprint of the code, and as a result understand how much of an impact
such a small piece of code could bring to this world. We provide a
minimalistic IDE-like setup for calculation, where each code is exeucted
within a Docker container. We also provide detailed analysis on the
results, as well as refactorization features that utilize OpenAI's AI
model, ChatGPT to optimize the code in terms of ecological impact.

![alt text](/images/website-1.png)

This project is done as an undergraduate project for
*Introduction to Software Engineering* by 7 team members
associated in Sungkyunkwan University, South Korea.

## Features
Our website provides carbon footprint calculation of Java code. We provide
asynchronous operations to allow for more concurrent users. The following are
some detailed features our website provides.

- View submission status and queue.

   ![alt text](/images/website-2.png)

- View results of code execution.

   ![alt text](/images/website-3.png)
  
- Detailed analysis of code execution results.

   ![alt text](/images/website-4.png)
  
- Refactorization using ChatGPT.

   ![alt text](/images/website-5.png)
## Execution

This repository contains code for both the server-side backend and client-side frontend.
Execution of the following scripts should be done within each respective directories.

### Backend
**[Python Environment]** Install the required Python packages. Use any virtual environment of your choice.
```bash
pip install -r requirements.txt
```

**[Database Setup]** Our website uses MySQL. The following script generates a database named 'codeco' with an admin user identified by a password of your choice.
```sql
CREATE DATABASE codeco;
CREATE USER 'admin'@'localhost' identified by <INSERT PASSWORD>;
GRANT ALL PRIVILEGES on codeco.* to 'admin'@'localhost';
FLUSH PRIVILEGES;
```
Run the following script to use Flask and MySQL together.
```bash
flask db upgrade
```

**[.env File]** Create the file './backend/.env' with the contents as below. Fill the necessary credentials.
```bash
FLASK_APP=app.py
FLASK_ENV=development
DB_USER=admin
DB_PASSWORD=<INSERT PASSWORD>
DB_HOST=localhost
DB_PORT=3306
DB_NAME=codeco
CELERY_BROKER= amqp://localhost:5672
CELERY_RESULT_BACKEND=redis://localhost:6379
OPENAI_API_KEY=<INSERT OPENAI_API_KEY>
```

**[Redis and RabbitMQ]** Our website uses Redis and RabbitMQ. The following scripts are for running the Docker containers for these two.
```bash
docker run --rm -d -p 6379:6379 --name redis-server redis &&\
docker run --rm -d -p 8080:15672 -p 5672:5672 --name rabbitmq-server rabbitmq
```

**[Server Execution]** Use the following two scripts to run the server. The two scripts should be ran in two separate terminals.
```bash
gunicorn -w 1 -b 127.0.0.1:4000 'app:app'
```
```bash
celery -A app.celery worker --loglevel INFO
```

### Frontend

**[Version]**

```bash
node : v21.1.0
npm : v10.2.0
monaco-editor/react : v4.6.0
Next.js : v13.5.6
```

**[How to change when using a different node version]**

```bash
nvm install node
nvm use 21.1.0
nvm alias default 21.1.0
```

**[Setup]**

```bash
npm install

npm install @monaco-editor/react --force

npm install axios

```

**[Getting Started]**

Install the NodeJS modules and run the following script for NextJS development mode.

```bash
npm run dev
# or
yarn dev
```
