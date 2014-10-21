Rails.application.routes.draw do

  root to: 'application#index'

  get '/game/socket' => 'game#socket'
  get '/game/start' => 'game#start'

end
