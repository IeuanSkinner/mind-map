Dir[File.join(Rails.root, 'db', 'seeds', '*.rb')].sort.each do |seed|
  load seed
end

puts "Topic Areas: #{TopicArea.count}"
puts "Mind Maps: #{MindMap.count}"
puts "Branches: #{Branch.count}"