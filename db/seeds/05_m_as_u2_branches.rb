m_as_u2_branch = @a_level_maths_mind_map.branches.create!(name: 'M AS U2', label: 'AS Unit 2: Applied Mathematics A', position: 'l')

m_as_u2_section_a_branch = m_as_u2_branch.child_branches.create!(label: 'Section A: Statistics', topic_area: @statistics)
m2_2_1_branch = m_as_u2_section_a_branch.child_branches.create!(name: 'M2.2.1', label: 'M2.2.1 Statistical Sampling')
m2_2_1_branch.child_branches.create!(name: 'M2.2.1a', label: 'M2.2.1a Sampling - Introduction & critiquing')

m2_2_2_branch = m_as_u2_section_a_branch.child_branches.create!(name: 'M2.2.2', label: 'M2.2.2 Data presentation and interpretation')
m2_2_2_branch.child_branches.create!(name: 'M2.2.2a', label: 'M2.2.2a Statistical Diagrams')
m2_2_2_branch.child_branches.create!(name: 'M2.2.2b', label: 'M2.2.2b Measures of Central Tendency & Variation')

m2_2_3_branch = m_as_u2_section_a_branch.child_branches.create!(name: 'M2.2.3', label: 'M2.2.3 Probability')
m2_2_3_branch.child_branches.create!(name: 'M2.2.3a', label: 'M2.2.3a Basic Probability')

m2_2_4_branch = m_as_u2_section_a_branch.child_branches.create!(name: 'M2.2.4', label: 'M2.2.4 Statistical distributions')
m2_2_4_branch.child_branches.create!(name: 'M2.2.4a', label: 'M2.2.4a Discrete Probability Distributions')
m2_2_4_branch.child_branches.create!(name: 'M2.2.4b', label: 'M2.2.4b Calculating Probabilities using Discrete Probability Distributions')
m2_2_4_branch.child_branches.create!(name: 'M2.2.4c', label: 'M2.2.4c Selecting an appropriate Discrete Probability Distribution')

m2_2_5_branch = m_as_u2_section_a_branch.child_branches.create!(name: 'M2.2.5', label: 'M2.2.5 Statistical hypothesis testing')
m2_2_5_branch.child_branches.create!(name: 'M2.2.5a', label: 'M2.2.5a Statistical hypothesis testing')

m_as_u2_section_b_branch = m_as_u2_branch.child_branches.create!(label: 'Section B: Mechanics', topic_area: @mechanics)
m2_2_6_branch = m_as_u2_section_b_branch.child_branches.create!(name: 'M2.2.6', label: 'M2.2.6 Quantities and units in mechanics')
m2_2_6_branch.child_branches.create!(name: 'M2.2.6a', label: 'M2.2.6a Quantities and units in mechanics')

m2_2_7_branch = m_as_u2_section_b_branch.child_branches.create!(name: 'M2.2.7', label: 'M2.2.7 Kinematics')
m2_2_7_branch.child_branches.create!(name: 'M2.2.7a', label: 'M2.2.7a Language and Graphs')
m2_2_7_branch.child_branches.create!(name: 'M2.2.7b', label: 'M2.2.7b Constant acceleration forumlae')
m2_2_7_branch.child_branches.create!(name: 'M2.2.7c', label: 'M2.2.7c Calculus for Motion in a Straight Line')

m2_2_8_branch = m_as_u2_section_b_branch.child_branches.create!(name: 'M2.2.8', label: "M2.2.8 Forces and Newton's laws")
m2_2_8_branch.child_branches.create!(name: 'M2.2.8a', label: "M2.2.8a Forces and Newton's laws - basics")

m2_2_9_branch = m_as_u2_section_b_branch.child_branches.create!(name: 'M2.2.9', label: 'M2.2.9 Vectors')
m2_2_9_branch.child_branches.create!(name: 'M2.2.9a', label: 'M2.2.9a Basic Vector mechanics')

