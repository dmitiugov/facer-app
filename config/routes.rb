Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  #devise_for :users, :controllers => { registrations: 'registrations' }
  devise_for :users
  get    'login'   => 'application#angular'
  root 'application#angular'
  resources :events, only: [:create, :index, :show, :destroy, :update]
  match '/events/get_ranged' => 'events#get_ranged', :via => :post
  match '/events/move_event_to_archive' => 'events#move_event_to_archive', :via => :post
  match '/events/show_archived_events' => 'events#show_archived_events', :via => :post
  match '/files/add_file_to_event' => 'files#add_file_to_event', :via => :post
  resources :guests, only: [:create, :index, :show, :destroy, :update]
  resources :accaunts, only: [:create, :index, :show, :destroy, :update]
  match '/accaunts/add_accaunt_to_user' => 'accaunts#add_accaunt_to_user', :via => :post
  resources :special_guests, only: [:create, :index, :show, :destroy, :update]
  resources :shows, only: [:create, :index, :show, :destroy, :update]
  match '/shows/check_show' => 'shows#check_show', :via => :post
  match '/shows/delete_all' => 'shows#delete_all', :via => :post
  match '/shows/select_all' => 'shows#select_all', :via => :post
  match '/shows/change_show_time' => 'shows#change_show_time', :via => :post
  resources :visits, only: [:create, :index, :show, :destroy, :update]
  match '/visits/check_visit' => 'visits#check_visit', :via => :post
  match '/files/add_file_to_user' => 'files#add_file_to_user', :via => :post
  match '/files/add_file_to_special' => 'files#add_file_to_special', :via => :post
  match '/visits/delete_all' => 'visits#delete_all', :via => :post
  match '/visits/select_all' => 'visits#select_all', :via => :post
  resources :artists, only: [:create, :index, :show, :destroy, :update, :embed]
  resources :users, only: [:show, :update]
  resources :posts, only: [:create, :index, :show] do
    resources :comments, only: [:show, :create] do
      member do
        put '/upvote' => 'comments#upvote'
      end
    end

    member do
      put '/upvote' => 'posts#upvote'
    end
  end
    
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
