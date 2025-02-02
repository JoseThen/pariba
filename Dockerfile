FROM alpine:3.10.3

WORKDIR /app

RUN apk add --no-cache \
    python3

COPY ./requirements.txt /app

RUN pip3 install -r requirements.txt

COPY . /app

ENTRYPOINT [ "flask" ]

CMD [ "run", "-h 0.0.0.0", "-p 80" ]