class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def index
    @players = REDIS.smembers(:players).map { |p| JSON.parse(p) }
    render :welcome
  end
end
