source 'https://rubygems.org'

ruby '2.0.0'

gem 'rails', '~> 4.1.0'

gem 'uglifier', '>= 1.3.0'
gem 'therubyracer', platforms: :ruby
gem 'haml'

gem 'puma'
gem 'tubesock'
gem 'heroku'
gem 'redis'

gem 'less-rails'
gem 'font-awesome-less'

gem 'jquery-rails'
gem 'turbolinks'
gem 'jbuilder', '~> 2.0'
gem 'quiet_assets'

group :development, :test do
  gem 'spring'
  gem 'sqlite3'
end

group :development do
  gem 'byebug', require: false
  gem 'haml-rails'
end

group :production do
  gem 'newrelic_rpm'
  gem 'pg'
  gem 'heroku_rails_deflate' # compress output
  gem 'rails_stdout_logging'
end
