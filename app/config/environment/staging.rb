Rails.application.configure do
    config.middleware.use Rack::Prerender, prerender_token: 'as3G1KeE6cYEZNzCvEnR'
end