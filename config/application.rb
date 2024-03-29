require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :development, or :production.
Bundler.require(*Rails.groups)

class Application < Rails::Application
  # Initialize configuration defaults for originally generated Rails version.
  config.load_defaults 7.0

  config.before_configuration do
    unless Rails.env.production?
      env_file = File.join(Rails.root, '.env')
      File.foreach(env_file).each do |line|
        env_var = line.split('=')
        ENV[env_var.first] = env_var.last
      end
    end
  end

  # Configuration for the application, engines, and railties goes here.
  #
  # These settings can be overridden in specific environments using the files
  # in config/environments, which are processed later.
  #
  # config.time_zone = "Central Time (US & Canada)"
  # config.eager_load_paths << Rails.root.join("extras")
end
