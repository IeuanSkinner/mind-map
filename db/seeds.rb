def branch(name)
  Branch.find_by_name(name)
end

def create_link(from_branch, to_branch, label)
  if from_branch.instance_of? String
    from_branch = branch(from_branch)
  end

  Link.create!(from_branch: from_branch, to_branch: branch(to_branch), label: label)
end

Dir[File.join(Rails.root, 'db', 'seeds', '*.rb')].sort.each do |seed|
  load seed
end

puts "Topic Areas: #{TopicArea.count}"
puts "Mind Maps: #{MindMap.count}"
puts "Branches: #{Branch.count}"
puts "Links: #{Link.count}"