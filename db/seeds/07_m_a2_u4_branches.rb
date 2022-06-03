m_a2_u4_branch = @a_level_maths_mind_map.branches.create!(name: 'M A2 U4', label: 'A2 Unit 4:,Applied Mathematics B', display: 'node', position: 'r')

m_a2_u4_section_a_branch = m_a2_u4_branch.child_branches.create!(label: 'Section A:,Statistics', display: 'node', topic_area: @statistics)

m2_4_1_branch = m_a2_u4_section_a_branch.child_branches.create!(name: 'M2.4.1', label: 'M2.4.1 Probability')
m2_4_1_branch.child_branches.create!(name: 'M2.4.1a', label: 'M2.4.1a Conditional Probability')
m2_4_1_branch.child_branches.create!(name: 'M2.4.1b', label: 'M2.4.1b Modelling with Probability')

m2_4_2_branch = m_a2_u4_section_a_branch.child_branches.create!(name: 'M2.4.2', label: 'M2.4.2 Statistical distributions')
m2_4_2_branch.child_branches.create!(name: 'M2.4.2a', label: 'M2.4.2a Understanding continuous probability distributions')
m2_4_2_branch.child_branches.create!(name: 'M2.4.2b', label: 'M2.4.2b Calculating probabilities of continuous probability distributions')
m2_4_2_branch.child_branches.create!(name: 'M2.4.2c', label: 'M2.4.2c Select appropriate probability distribution')

m2_4_3_branch = m_a2_u4_section_a_branch.child_branches.create!(name: 'M2.4.3', label: 'M2.4.3 Statistical hypothesis testing')
m2_4_3_branch.child_branches.create!(name: 'M2.4.3a', label: 'M2.4.3a Further Statistical hypothesis testing')

m_a2_u4_section_b_branch = m_a2_u4_branch.child_branches.create!(label: 'Section B:,Differential Equations,and Mechanics', display: 'node', topic_area: @mechanics)

m2_4_4_branch = m_a2_u4_section_b_branch.child_branches.create!(name: 'M2.4.4', label: 'M2.4.4 Trigonometry')
m2_4_4_branch.child_branches.create!(name: 'M2.4.4a', label: 'M2.4.4a Trigonometry in mechanics')

m2_4_5_branch = m_a2_u4_section_b_branch.child_branches.create!(name: 'M2.4.5', label: 'M2.4.5 Differentiation')
m2_4_5_branch.child_branches.create!(name: 'M2.4.5a', label: 'M2.4.5a Construct simple differential equations')

m2_4_6_branch = m_a2_u4_section_b_branch.child_branches.create!(name: 'M2.4.6', label: 'M2.4.6 Integration')
m2_4_6_branch.child_branches.create!(name: 'M2.4.6a', label: 'M2.4.6a Solve simple differential equations')

m2_4_7_branch = m_a2_u4_section_b_branch.child_branches.create!(name: 'M2.4.7', label: 'M2.4.7 Quantities and units in mechanics')
m2_4_7_branch.child_branches.create!(name: 'M2.4.7a', label: 'M2.4.7a Quantities and units - moments')

m2_4_8_branch = m_a2_u4_section_b_branch.child_branches.create!(name: 'M2.4.8', label: 'M2.4.8 Kinematics')
m2_4_8_branch.child_branches.create!(name: 'M2.4.8a', label: 'M2.4.8a Vector Kinematics')
m2_4_8_branch.child_branches.create!(name: 'M2.4.8b', label: 'M2.4.8b 2D-Kinematics Calculus')

m2_4_9_branch = m_a2_u4_section_b_branch.child_branches.create!(name: 'M2.4.9', label: "M2.4.9 Forces and Newton's laws")
m2_4_9_branch.child_branches.create!(name: 'M2.4.9a', label: 'M2.4.9a Resolving Forces & Friction')

m2_4_10_branch = m_a2_u4_section_b_branch.child_branches.create!(name: 'M2.4.10', label: 'M2.4.10 Moments')
m2_4_10_branch.child_branches.create!(name: 'M2.4.10a', label: 'M2.4.10a Moments')

m2_4_11_branch = m_a2_u4_section_b_branch.child_branches.create!(name: 'M2.4.11', label: 'M2.4.11 Vectors')
m2_4_11_branch.child_branches.create!(name: 'M2.4.11a', label: 'M2.4.11a Vectors in 3-D')
