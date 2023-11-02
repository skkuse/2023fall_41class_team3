FROM ubuntu

ENV JAVA_HOME=/opt/java/openjdk

COPY --from=eclipse-temurin:11 $JAVA_HOME $JAVA_HOME

ENV PATH="${JAVA_HOME}/bin:${PATH}"

WORKDIR /app

COPY ./Main.java /app

RUN javac Main.java

CMD ["bash", "-c", "{ time java Main ; } >> exec.txt 2>> exec.txt && cat /sys/fs/cgroup/cpu.stat >> exec.txt"]
