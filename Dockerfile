FROM ruby:2.2.0

RUN apt-get update -qq \
    && apt-get install -y --no-install-recommends \
       nodejs libpq-dev build-essential postgresql-client

RUN mkdir /app
WORKDIR /app

ADD Gemfile /app/Gemfile
ADD Gemfile.lock /app/Gemfile.lock

RUN bundle install

EXPOSE 3000

ADD . /app

RUN bundle exec rake db:create
RUN bundle exec rake db:migrate
RUN bundle exec rake db:seed
