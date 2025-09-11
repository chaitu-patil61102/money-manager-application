#FROM eclipse-temurin:21-jre
#WORKDIR /app
#COPY target/moneymanager-0.0.1-SNAPSHOT.jar app.jar
#EXPOSE 9090
#ENTRYPOINT ["java","-jar","moneymanager-v1.0.jar"]

#FROM eclipse-temurin:21-jre
#WORKDIR /app
#COPY target/moneymanager-0.0.1-SNAPSHOT.jar app.jar
#EXPOSE 8080
#ENTRYPOINT ["java","-jar","app.jar"]


# Stage 1: Build the app
FROM maven:3.9.5-eclipse-temurin-21 AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run the app
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=builder /app/target/moneymanager-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
