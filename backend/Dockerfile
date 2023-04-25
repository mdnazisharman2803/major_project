FROM python:3.8.3
WORKDIR /usr/src/app
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
RUN python3 -m pip install --upgrade pip
COPY sentiment_analysis_backend/requirements.txt .
RUN python3 -m pip install -r requirements.txt
RUN pip install -U Twisted[tls,http2]
EXPOSE 8000

COPY sentiment_analysis_backend/ .

CMD python3 manage.py runserver 0.0.0.0:8000