
# Cars Management Application

## Description

This repository contains a full-stack web application for managing cars, built with a Spring Boot backend, an Angular frontend, and a PostgreSQL database. It also includes Prometheus and Grafana for monitoring purposes.

## Prerequisites

Before running the application, ensure you have the following installed on your system:

- [Docker Desktop](https://docs.docker.com/desktop/install/windows-install/)

## Getting Started

To get started with the application, follow the instructions below.

### Step 1: Clone the repository

```bash
git clone https://github.com/yourusername/cars-management.git
cd cars-management
```

### Step 2: Build Docker Images

If you don’t already have the necessary Docker images, you can build them from the Dockerfiles in this project.

#### 2.1 Build the Frontend Image

```bash
docker build -t cars-mangem-frontend ./frontend
```

#### 2.2 Build the Backend Image

```bash
docker build -t cars-mangem-backend ./backend
```

#### 2.3 Verify the Created Images

You can verify that the images were successfully built by listing the available images:

```bash
docker images
```

### Step 3: Run the Application with Docker Compose

Once the images are ready (or downloaded), follow these steps to start the application using Docker Compose.

1. Make sure you're in the directory containing the `docker-compose.yml` file.
2. Run the following command to start the containers:

```bash
docker-compose up -d
```

### Step 4: Access the Application

- **Frontend**: Open a browser and go to [http://localhost:3000](http://localhost:3000)
- **Backend**: You can access the backend via [http://localhost:8080/api](http://localhost:8080/api)

### Step 5: Monitoring with Prometheus and Grafana

#### 5.1 Access Prometheus

Prometheus will be available at [http://localhost:9090](http://localhost:9090).

#### 5.2 Access Grafana

Grafana will be available at [http://localhost:3001](http://localhost:3001). The default credentials for Grafana are:

- **Username**: admin
- **Password**: admin

You can configure dashboards to monitor the application using Prometheus as the data source.

### Step 6: Stopping the Containers

To stop and remove all containers associated with the application, use the following command:

```bash
docker-compose down
```
