@fm_a2_u4_branch = @a_level_further_maths_mind_map.branches.create!(name: 'FM A2 U4', label: 'A2 Unit 4: Further Pure Mathematics', topic_area: @pure, position: 'r')

@fm2_4_1_branch = @fm_a2_u4_branch.child_branches.create!(name: 'FM2.4.1', label: 'FM2.4.1 Complex Numbers')
@fm2_4_1a_branch = @fm2_4_1_branch.child_branches.create!(name: "FM2.4.1a", label: "FM2.4.1a De Molvre's Theorem")

@fm2_4_2_branch = @fm_a2_u4_branch.child_branches.create!(name: 'FM2.4.2', label: 'FM2.4.2 Further Trigonometry')
@fm2_4_2a_branch = @fm2_4_2_branch.child_branches.create!(name: 'FM2.4.2a', label: 'FM2.4.2a Further Trigonometry')

@fm2_4_3_branch = @fm_a2_u4_branch.child_branches.create!(name: 'FM2.4.3', label: 'FM2.4.3 Matrices')
@fm2_4_3a_branch = @fm2_4_3_branch.child_branches.create!(name: 'FM2.4.3a', label: 'FM2.4.3a Inverse of a 3 by 3 matrix')
@fm2_4_3b_branch = @fm2_4_3_branch.child_branches.create!(name: 'FM2.4.3b', label: 'FM2.4.3b Using Matrices to Solve Simultaneous Equations')

@fm2_4_4_branch = @fm_a2_u4_branch.child_branches.create!(name: 'FM2.4.4', label: 'FM2.4.4 Further Algebra and Functions')
@fm2_4_4a_branch = @fm2_4_4_branch.child_branches.create!(name: "FM2.4.4a", label: "FM2.4.4a Maclaurin's Series")
@fm2_4_4b_branch = @fm2_4_4_branch.child_branches.create!(name: 'FM2.4.4b', label: 'FM2.4.4b Partial Fractions')

@fm2_4_5_branch = @fm_a2_u4_branch.child_branches.create!(name: 'FM2.4.5', label: 'FM2.4.5 Further Calculus')
@fm2_4_5a_branch = @fm2_4_5_branch.child_branches.create!(name: 'FM2.4.5a', label: 'FM2.4.5a Infinite integrals')
@fm2_4_5b_branch = @fm2_4_5_branch.child_branches.create!(name: 'FM2.4.5b', label: 'FM2.4.5b Volumes of Revolution')
@fm2_4_5c_branch = @fm2_4_5_branch.child_branches.create!(name: 'FM2.4.5c', label: 'FM2.4.5c Mean value of a function')
@fm2_4_5d_branch = @fm2_4_5_branch.child_branches.create!(name: 'FM2.4.5d', label: 'FM2.4.5d Partial Fractions - quadratic factors')
@fm2_4_5e_branch = @fm2_4_5_branch.child_branches.create!(name: 'FM2.4.5e', label: 'FM2.4.5e Differentiation of Inverse trig functions')
@fm2_4_5f_branch = @fm2_4_5_branch.child_branches.create!(name: 'FM2.4.5f', label: 'FM2.4.5f Integrate using trig functions')

@fm2_4_6_branch = @fm_a2_u4_branch.child_branches.create!(name: 'FM2.4.6', label: 'FM2.4.6 Polar Coordinates')
@fm2_4_6a_branch = @fm2_4_6_branch.child_branches.create!(name: 'FM2.4.6a', label: 'FM2.4.6a Polar Coordinates - basics')
@fm2_4_6b_branch = @fm2_4_6_branch.child_branches.create!(name: 'FM2.4.6b', label: 'FM2.4.6b Polar Coordinates - areas')

@fm2_4_7_branch = @fm_a2_u4_branch.child_branches.create!(name: 'FM2.4.7', label: 'FM2.4.7 Hyperbolic functions')
@fm2_4_7a_branch = @fm2_4_7_branch.child_branches.create!(name: 'FM2.4.7a', label: 'FM2.4.7a Hyperbolic functions')
@fm2_4_7b_branch = @fm2_4_7_branch.child_branches.create!(name: 'FM2.4.7b', label: 'FM2.4.7b Hyperbolic functions - calculus')

@fm2_4_8_branch = @fm_a2_u4_branch.child_branches.create!(name: 'FM2.4.8', label: 'FM2.4.8 Differential equations')
@fm2_4_8a_branch = @fm2_4_8_branch.child_branches.create!(name: 'FM2.4.8a', label: 'FM2.4.8a Further 1st order Differential equations')
@fm2_4_8b_branch = @fm2_4_8_branch.child_branches.create!(name: 'FM2.4.8b', label: 'FM2.4.8b 2nd order Differential equations')
