# Use a base image with Java 17 (or the version you are using)
FROM openjdk:17-jdk-slim as build

# Set the working directory
WORKDIR /app

# Copy the Maven build files
COPY pom.xml ./
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# Create a new stage for running the application
FROM openjdk:17-jdk-slim

# Set the working directory for the application
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the application port
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
