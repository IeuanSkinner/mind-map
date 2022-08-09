fm_a2_u5_node = @a_level_further_maths_mind_map.nodes.create!(name: 'FM A2 U5', label: 'A2 Unit 5: Further Statistics', topic_area: @statistics, position: 'r')

fm2_5_1_node = fm_a2_u5_node.child_nodes.create!(name: 'FM2.5.1', label: 'FM2.5.1 Samples and Populations')
fm2_5_1_node.child_nodes.create!(name: 'FM2.5.1a', label: 'FM2.5.1a Estimators')

fm2_5_2_node = fm_a2_u5_node.child_nodes.create!(name: 'FM2.5.2', label: 'FM2.5.2 Statistical Distributions')
fm2_5_2_node.child_nodes.create!(name: 'FM2.5.2a', label: 'FM2.5.2a Linear combination & Central Limit Theorem')

fm2_5_3_node = fm_a2_u5_node.child_nodes.create!(name: 'FM2.5.3', label: 'FM2.5.3 Hypothesis Testing')
fm2_5_3_node.child_nodes.create!(name: 'FM2.5.3a', label: 'FM2.5.3a Hypothesis testing & signed-rank tests')

fm2_5_4_node = fm_a2_u5_node.child_nodes.create!(name: 'FM2.5.4', label: 'FM2.5.4 Estimation')
fm2_5_4_node.child_nodes.create!(name: 'FM2.5.4a', label: 'FM2.5.4a Estimation & Confidence')
