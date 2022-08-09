fm_as_u2_node = @a_level_further_maths_mind_map.nodes.create!(name: 'FM AS U2', label: 'AS Unit 2: Further Statistics', topic_area: @statistics, position: 'l')

fm2_2_1_node = fm_as_u2_node.child_nodes.create!(name: 'FM2.2.1', label: 'FM2.2.1 Random Variables and the Poisson Process')
fm2_2_1_node.child_nodes.create!(name: 'FM2.2.1a', label: 'FM2.2.1a Meath and Variance of Independent Random Variables')
fm2_2_1_node.child_nodes.create!(name: 'FM2.2.1b', label: 'FM2.2.1b Discrete Probability Distributions')
fm2_2_1_node.child_nodes.create!(name: 'FM2.2.1c', label: 'FM2.2.1c Continuous Probability Distributions')
fm2_2_1_node.child_nodes.create!(name: 'FM2.2.1d', label: 'FM2.2.1d Poisson and exponential distributions')

fm2_2_2_node = fm_as_u2_node.child_nodes.create!(name: 'FM2.2.2', label: 'FM2.2.2 Exploring relationships between variables and goodness fit of a model')
fm2_2_2_node.child_nodes.create!(name: 'FM2.2.2a', label: 'FM2.2.2a Correlation & Goodness of fit')
