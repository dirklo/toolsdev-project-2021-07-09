desc "Update stale forecast entries into historical entries"
task :update_stale_entries => :environment do
  puts "Updating stale entries..."
  UpdateStaleEntriesJob.perform_now
  puts "done."
end