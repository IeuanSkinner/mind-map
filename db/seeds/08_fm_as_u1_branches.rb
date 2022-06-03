fm_as_u1_branch = @a_level_further_maths_mind_map.branches.create!(name: 'FM AS U1', label: 'AS Unit 1: Futher Pure Mathematics', topic_area: @pure, position: 'l')

fm2_1_1_branch = fm_as_u1_branch.child_branches.create!(name: 'FM2.1.1', label: 'FM2.1.1 Proof')
fm2_1_1_branch.child_branches.create!(name: 'FM2.1.1a', label: 'FM2.1.1a Proof by Induction')

fm2_1_2_branch = fm_as_u1_branch.child_branches.create!(name: 'FM2.1.2', label: 'FM2.1.2 Complex Numbers')
fm2_1_2_branch.child_branches.create!(name: 'FM2.1.2a', label: 'FM2.1.2a Complex numbers - Basic Concepts')
fm2_1_2_branch.child_branches.create!(name: 'FM2.1.2b', label: 'FM2.1.2b Geometric interpretation of Complex Numbers')
fm2_1_2_branch.child_branches.create!(name: 'FM2.1.2c', label: 'FM2.1.2c Loci and Transformations in the Argand Diagram')

fm2_1_3_branch = fm_as_u1_branch.child_branches.create!(name: 'FM2.1.3', label: 'FM2.1.3 Matrices')
fm2_1_3_branch.child_branches.create!(name: 'FM2.1.3a', label: 'FM2.1.3a Matrix manipulation')
fm2_1_3_branch.child_branches.create!(name: 'FM2.1.3b', label: 'FM2.1.3b Matrix Transformations')

fm2_1_4_branch = fm_as_u1_branch.child_branches.create!(name: 'FM2.1.4', label: 'FM2.1.4 Further Algebra and Functions')
fm2_1_4_branch.child_branches.create!(name: 'FM2.1.4a', label: 'FM2.1.4a Polynomials')
fm2_1_4_branch.child_branches.create!(name: 'FM2.1.4b', label: 'FM2.1.4b Sums of Series')

fm2_1_5_branch = fm_as_u1_branch.child_branches.create!(name: 'FM2.1.5', label: 'FM2.1.5 Further Vectors')
fm2_1_5_branch.child_branches.create!(name: 'FM2.1.5a', label: 'FM2.1.5a Further Vectors')
