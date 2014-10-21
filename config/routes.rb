Rails.application.routes.draw do

  root to: 'application#index'

  get '/game/socket' => 'game#socket'
  get '/game/start' => 'game#start'

  namespace :admin do
    resources :questions
  end
  get '/admin' => 'admin/base#index'

end
