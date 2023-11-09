FROM ubuntu

ENV JAVA_HOME=/opt/java/openjdk

COPY --from=eclipse-temurin:11 $JAVA_HOME $JAVA_HOME

ENV PATH="${JAVA_HOME}/bin:${PATH}"

WORKDIR /app

CMD ["bash", "-c",\
    "javac Main.java &&\
    { time java Main ; } >> execution_results.txt 2>> execution_results.txt"]
