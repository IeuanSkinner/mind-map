@fm_as_u3_branch = @a_level_further_maths_mind_map.branches.create!(name: 'FM AS U3', label: 'AS Unit 3: Further Mechanics', topic_area: @mechanics, position: 'l')

@fm2_3_1_branch = @fm_as_u3_branch.child_branches.create!(label: 'FM2.3.1 Momentum and Impulse')
@fm2_3_1a_branch = @fm2_3_1_branch.child_branches.create!(label: 'FM2.3.1a Momentum and Impulse')

@fm2_3_2_branch = @fm_as_u3_branch.child_branches.create!(label: "FM2.3.2 Hooke's Law, Work, Energy and Power")
@fm2_3_2a_branch = @fm2_3_2_branch.child_branches.create!(label: "FM2.3.2a Hooke's Law, Work, Energy and Power")

@fm2_3_3_branch = @fm_as_u3_branch.child_branches.create!(label: 'FM2.3.3 Circular Motion')
@fm2_3_3a_branch = @fm2_3_3_branch.child_branches.create!(label: 'FM2.3.3a Angular Speed and Radial Acceleration')
@fm2_3_3b_branch = @fm2_3_3_branch.child_branches.create!(label: 'FM2.3.3b Motion in a Horizontal Circle')
@fm2_3_3c_branch = @fm2_3_3_branch.child_branches.create!(label: 'FM2.3.3c Motion in a Vertical Circle')

@fm2_3_4_branch = @fm_as_u3_branch.child_branches.create!(label: 'FM2.3.4 Differentiation and Integration of Vectors')
@fm2_3_4a_branch = @fm2_3_4_branch.child_branches.create!(label: 'FM2.3.4a Differentiation and Integration of Vectors')
