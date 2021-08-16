FROM python:3.8-slim-buster 

WORKDIR /backend

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1

# Create virtual env
RUN python -m venv /env

# Update Linux package manager and download required build tools
RUN apt-get update \
  && apt-get -y install netcat gcc libpq-dev \
  && apt-get clean 

# Copy over Google Storage Credential for Django Storage to use
COPY ./testplr-21716eea11e2.json testplr-21716eea11e2.json

# Install required dependencies in virtual env
RUN /env/bin/pip install --upgrade pip 
COPY ./requirements.txt /backend/requirements.txt 
RUN /env/bin/pip install -r requirements.txt 

# Copy in app
COPY . /backend

# Set path
ENV VIRTUAL_ENV /env 
ENV PATH /env/bin:$PATH

EXPOSE 8000

CMD ["gunicorn", "--bind", ":8000", "--workers", "3", "app.wsgi"]
