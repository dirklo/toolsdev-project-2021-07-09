desc "This task is called by the Heroku scheduler add-on"
task :update_stale_entries => :environment do
  puts "Updating stale entries..."
  UpdateStaleEntriesJob.perform_now
  puts "done."
end