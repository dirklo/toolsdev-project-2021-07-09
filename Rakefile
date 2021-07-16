# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require_relative 'config/application'

Rails.application.load_tasks


desc 'Update Stale Entries'
namespace :app do
    namespace :jobs do
        task :update_stale_entries do
            UpdateStaleEntriesJob.perform_now
        end
    end
end