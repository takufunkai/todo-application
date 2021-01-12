if Rails.env == "production"
  Rails.application.config.session_store :cookie_store, key: "_authentication_app", domain: "jdh-authentication-app-api.herokuapp.com" #heroku domain
else
  Rails.application.config.session_store :cookie_store, key: "_authentication_app", domain: nil, secure: true, httponly: false, same_site: :none
end