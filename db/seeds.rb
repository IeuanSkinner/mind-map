def node(name)
  Node.find_by_name(name)
end

def create_link(from_node, to_node, label)
  if from_node.instance_of? String
    from_node = node(from_node)
  end

  Link.create!(from_node: from_node, to_node: node(to_node), label: label)
end

Dir[File.join(Rails.root, 'db', 'seeds', '*.rb')].sort.each do |seed|
  load seed
end

puts "Topic Areas: #{TopicArea.count}"
puts "Mind Maps: #{MindMap.count}"
puts "Nodes: #{Node.count}"
puts "Links: #{Link.count}"