class Admin::BaseController < ApplicationController
  http_basic_authenticate_with name: ENV['admin_name'] || 'trivia', password: ENV['admin_password'] || 'line'

  def index
  end
end
