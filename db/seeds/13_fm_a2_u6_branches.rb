fm_a2_u6_node = @a_level_further_maths_mind_map.nodes.create!(name: 'FM A2 U6', label: 'A2 Unit 6: Further Mechanics', topic_area: @mechanics, position: 'r')

fm2_6_1_node = fm_a2_u6_node.child_nodes.create!(name: 'FM2.6.1', label: 'FM2.6.1 Rectilinear motion')
fm2_6_1_node.child_nodes.create!(name: 'FM2.6.1a', label: 'FM2.6.1a Rectilinear calculus')

fm2_6_2_node = fm_a2_u6_node.child_nodes.create!(name: 'FM2.6.2', label: 'FM2.6.2 Momentum and Impulse')
fm2_6_2_node.child_nodes.create!(name: 'FM2.6.2a', label: 'FM2.6.2a Momentum - vectors')

fm2_6_3_node = fm_a2_u6_node.child_nodes.create!(name: 'FM2.6.3', label: 'FM2.6.3 Moments and Centre of Mass')
fm2_6_3_node.child_nodes.create!(name: 'FM2.6.3a', label: 'FM2.6.3a Centre of mass - particles/uniform lamina')
fm2_6_3_node.child_nodes.create!(name: 'FM2.6.3b', label: 'FM2.6.3b Centre of mass - rigid bodies')

fm2_6_4_node = fm_a2_u6_node.child_nodes.create!(name: 'FM2.6.4', label: 'FM2.6.4 Equilibrium of Rigid Bodies')
fm2_6_4_node.child_nodes.create!(name: 'FM2.6.4a', label: 'FM2.6.4a Equilibrium of Rigid Bodies')

fm2_6_5_node = fm_a2_u6_node.child_nodes.create!(name: 'FM2.6.5', label: 'FM2.6.5 Differential Equations')
fm2_6_5_node.child_nodes.create!(name: 'FM2.6.5a', label: 'FM2.6.5a Kinematic modelling')
fm2_6_5_node.child_nodes.create!(name: 'FM2.6.5b', label: 'FM2.6.5b Simple Harmonic Motion')
