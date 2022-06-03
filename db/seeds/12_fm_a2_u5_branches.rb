fm_a2_u5_branch = @a_level_further_maths_mind_map.branches.create!(name: 'FM A2 U5', label: 'A2 Unit 5:,Further,Statistics', display: 'node', topic_area: @statistics, position: 'r')

fm2_5_1_branch = fm_a2_u5_branch.child_branches.create!(name: 'FM2.5.1', label: 'FM2.5.1 Samples and Populations')
fm2_5_1_branch.child_branches.create!(name: 'FM2.5.1a', label: 'FM2.5.1a Estimators')

fm2_5_2_branch = fm_a2_u5_branch.child_branches.create!(name: 'FM2.5.2', label: 'FM2.5.2 Statistical Distributions')
fm2_5_2_branch.child_branches.create!(name: 'FM2.5.2a', label: 'FM2.5.2a Linear combination & Central Limit Theorem')

fm2_5_3_branch = fm_a2_u5_branch.child_branches.create!(name: 'FM2.5.3', label: 'FM2.5.3 Hypothesis Testing')
fm2_5_3_branch.child_branches.create!(name: 'FM2.5.3a', label: 'FM2.5.3a Hypothesis testing & signed-rank tests')

fm2_5_4_branch = fm_a2_u5_branch.child_branches.create!(name: 'FM2.5.4', label: 'FM2.5.4 Estimation')
fm2_5_4_branch.child_branches.create!(name: 'FM2.5.4a', label: 'FM2.5.4a Estimation & Confidence')
