Rails.application.routes.draw do

  root to: 'application#index'

  get '/game' => 'game#index'
  get '/game/socket' => 'game#socket'

end
