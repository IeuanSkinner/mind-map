@m_a2_u4_branch = @a_level_maths_mind_map.branches.create!(name: 'M A2 U4', label: 'A2 Unit 4: Applied Mathematics B', position: 'r')

@m_a2_u4_section_a_branch = @m_a2_u4_branch.child_branches.create!(label: 'Section A: Statistics', topic_area: @statistics)

@m2_4_1_branch = @m_a2_u4_section_a_branch.child_branches.create!(label: 'M2.4.1 Probability')
@m2_4_1a_branch = @m2_4_1_branch.child_branches.create!(label: 'M2.4.1a Conditional Probability')
@m2_4_1b_branch = @m2_4_1_branch.child_branches.create!(label: 'M2.4.1b Modelling with Probability')

@m2_4_2_branch = @m_a2_u4_section_a_branch.child_branches.create!(label: 'M2.4.2 Statistical distributions')
@m2_4_2a_branch = @m2_4_2_branch.child_branches.create!(label: 'M2.4.2a Understanding continuous probability distributions')
@m2_4_2b_branch = @m2_4_2_branch.child_branches.create!(label: 'M2.4.2b Calculating probabilities of continuous probability distributions')
@m2_4_2c_branch = @m2_4_2_branch.child_branches.create!(label: 'M2.4.2c Select appropriate probability distribution')

@m_a2_u4_section_b_branch = @m_a2_u4_branch.child_branches.create!(label: 'Section B: Differential Equations and Mechanics', topic_area: @mechanics)

@m2_4_4_branch = @m_a2_u4_section_b_branch.child_branches.create!(label: 'M2.4.4 Trigonometry')
@m2_4_4a_branch = @m2_4_4_branch.child_branches.create!(label: 'M2.4.4a Trigonometry in mechanics')

@m2_4_5_branch = @m_a2_u4_section_b_branch.child_branches.create!(label: 'M2.4.5 Differentiation')
@m2_4_5a_branch = @m2_4_5_branch.child_branches.create!(label: 'M2.4.5a Construct simple differential equations')

@m2_4_6_branch = @m_a2_u4_section_b_branch.child_branches.create!(label: 'M2.4.6 Integration')
@m2_4_6a_branch = @m2_4_6_branch.child_branches.create!(label: 'M2.4.6a Solve simple differential equations')

@m2_4_7_branch = @m_a2_u4_section_b_branch.child_branches.create!(label: 'M2.4.7 Quantities and units in mechanics')
@m2_4_7a_branch = @m2_4_7_branch.child_branches.create!(label: 'M2.4.7a Quantities and units - moments')

@m2_4_8_branch = @m_a2_u4_section_b_branch.child_branches.create!(label: 'M2.4.8 Kinematics')
@m2_4_8a_branch = @m2_4_8_branch.child_branches.create!(label: 'M2.4.8a Vector Kinematics')
@m2_4_8b_branch = @m2_4_8_branch.child_branches.create!(label: 'M2.4.8b 2D-Kinematics Calculus')

@m2_4_9_branch = @m_a2_u4_section_b_branch.child_branches.create!(label: "M2.4.9 Forces and Newton's laws")
@m2_4_9a_branch = @m2_4_9_branch.child_branches.create!(label: 'M2.4.9a Resolving Forces & Friction')

@m2_4_10_branch = @m_a2_u4_section_b_branch.child_branches.create!(label: 'M2.4.10 Moments')
@m2_4_10a_branch = @m2_4_10_branch.child_branches.create!(label: 'M2.4.10a Moments')

@m2_4_11_branch = @m_a2_u4_section_b_branch.child_branches.create!(label: 'M2.4.11 Vectors')
@m2_4_11a_branch = @m2_4_11_branch.child_branches.create!(label: 'M2.4.11a Vectors in 3-D')
