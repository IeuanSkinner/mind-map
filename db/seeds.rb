Dir[File.join(Rails.root, 'db', 'seeds', '*.rb')].sort.each do |seed|
  load seed
end

# def level(paper)
#   case paper.first
#   when 'M'
#     'WJEC GCE Mathematics'
#   when 'FM'
#     'WJEC GCE Further Mathematics'
#   else
#     raise "Unknown Level #{level}!"
#   end
# end

# def paper(paper)
#   name = case paper.join(' ')
#   when 'M AS U1'
#     'Pure Mathematics A'
#   when 'M AS U2A', 'M AS U2B'
#     'Applied Mathematics A'
#   when 'M A2 U3'
#     'Mathematics B'
#   when 'M A2 U4A', 'M A2 U4B'
#     'Applied Mathematics B'
#   when 'FM AS U1', 'FM A2 U4'
#     'Further Pure Mathematics'
#   when 'FM AS U2', 'FM A2 U5',
#     'Further Statistics'
#   when 'FM AS U3', 'FM A2 U6'
#     'Further Mechanics'
#   else
#     raise "Unknown Paper #{paper.join(' ')}!"
#   end

#   debugger

#   "#{paper.first} Unit #{paper.last.first}: #{name}"
# end

# def section(paper)
#   name = case paper.join(' ')
#   when 'M AS U2A', 'M A2 U4A'
#     'Statistics'
#   when 'M AS U2B', 'M A2 U4B'
#     'Mechanics'
#   else
#     raise "Unknown Section #{paper.join(' ')}!"
#   end
  
#   "Section #{paper.last.last}: #{name}"
# end

# xlsx.sheet(0).each_with_index do |row, index|
#   next if index < 2 # Ignore first 2 rows

#   area = row.first

#   next unless area.present?

#   @area = Area.find_or_create_by!(name: area, colour: colour(area))
  
#   paper_id = row[1].split
#   @level = Node.find_or_create_by!(name: level(paper_id))
#   @paper = Node.find_or_create_by!(name: paper(paper_id))
#   SubNode.find_or_create_by!(parent_node: @level, sub_node: @paper)

#   if paper_id.last.ends_with?('A') || paper_id.last.ends_with?('B')
#     @section = Node.find_or_create_by!(name: section(paper_id), area: @area)
#     SubNode.find_or_create_by!(parent_node: @paper, sub_node: @section)
#   else
#     @paper.update!(area: @area)
#   end

#   @topic = Node.find_or_create_by!(name: row[2], area: @area)
#   SubNode.find_or_create_by!(parent_node_id: (@section || @paper).id, sub_node: @topic)

#   @sub_topic = Node.create!(name: row[3], area: @area)
#   SubNode.create!(parent_node: @topic, sub_node: @sub_topic)

#   @learning_objective = LearningObjective.create!(node: @sub_topic, text: row[5])
# end

# puts "Areas: #{Area.count}"
# puts "Nodes: #{Node.count}"
# puts "Sub Nodes: #{SubNode.count}"
# puts "Learning Objectives: #{LearningObjective.count}"