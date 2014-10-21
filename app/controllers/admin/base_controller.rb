class Admin::BaseController < ApplicationController

  http_basic_authenticate_with :name => 'trivia', :password => 'line'


  def index

  end


end
