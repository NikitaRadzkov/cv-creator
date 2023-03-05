FROM maven:3.6.0-jdk-11-slim AS build
COPY api /home/app/api
COPY pom.xml /home/app
COPY client /home/app/client
RUN mvn -f /home/app/api/pom.xml package

FROM openjdk:11-jre-slim
COPY --from=build /home/app/api/target/api-1.0-SNAPSHOT.jar /usr/local/lib/app.jar
COPY --from=build /home/app/api/target/libs /usr/local/lib/libs
RUN mkdir -p /usr/local/lib/api
RUN mkdir -p /usr/local/lib/api/download
RUN mkdir -p /usr/local/lib/api/jsonStore
RUN mkdir -p /usr/local/lib/api/photo
RUN mkdir -p /usr/local/lib/api/unpacking
COPY --from=build /home/app/api/pattern.docx /usr/local/lib/api/pattern.docx
ENTRYPOINT ["java","-jar","/usr/local/lib/app.jar"]

FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install \
  npm install -g serve
COPY . .
RUN npm run build

