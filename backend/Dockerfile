FROM python:3.9

WORKDIR /app

RUN apt-get update && apt-get install -y netcat-openbsd

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

RUN chmod +x entrypoint.sh
RUN sed -i 's/\r$//g' entrypoint.sh

RUN useradd -m myuser
RUN chown -R myuser:myuser /app
USER myuser

ENTRYPOINT ["./entrypoint.sh"] 