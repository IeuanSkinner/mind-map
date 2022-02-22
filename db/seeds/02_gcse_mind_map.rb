@gcse_mm = MindMap.create!(name: 'GCSE Maths', label: 'WJEC GCSE Mathematics', position: 'l')

@general_branch = @gcse_mm.branches.create!(label: 'General', position: 'r', colour: '#b07aa1') # Purple
@proof_branch = @general_branch.child_branches.create!(label: 'Proof')

@number_branch = @gcse_mm.branches.create!(label: 'Number', position: 'r', colour: '#000')
@square_root_branch = @number_branch.child_branches.create!(label: 'Square Root')
@indices_branch = @number_branch.child_branches.create!(label: 'Indices')
@fractions_branch = @number_branch.child_branches.create!(label: 'Fractions')
@long_division_branch = @number_branch.child_branches.create!(label: 'Long Division')

@algebra_branch = @gcse_mm.branches.create!(label: 'Algebra', position: 'r', colour: '#59a1f4') # Green
@equations_formula_branch = @algebra_branch.child_branches.create!(label: 'Equations & Formulae')
@identity_branch = @equations_formula_branch.child_branches.create!(label: 'Identity')
@sequences_branch = @algebra_branch.child_branches.create!(label: 'Sequences')
@functions_branch = @algebra_branch.child_branches.create!(label: 'Functions')
@graphs_branch = @algebra_branch.child_branches.create!(label: 'Graphs')

@geometry_measure_branch = @gcse_mm.branches.create!(label: 'Geometry & Measure', position: 'r', colour: '#9c755f') # Brown
@rotation_branch = @geometry_measure_branch.child_branches.create!(label: 'Rotation')
@pythagoras_branch = @geometry_measure_branch.child_branches.create!(label: 'Pythagoras')
@circles_branch = @geometry_measure_branch.child_branches.create!(label: 'Circles')
@circle_theorems_branch = @circles_branch.child_branches.create!(label: 'Circle Theorems')
@circle_measure_branch = @circles_branch.child_branches.create!(label: 'Circle Measure')
@trigonometry_branch = @geometry_measure_branch.child_branches.create!(label: 'Trigonometry')
@measurement_branch = @geometry_measure_branch.child_branches.create!(label: 'Measurement')
@area_branch = @geometry_measure_branch.child_branches.create!(label: 'Area')

@statistics_branch = @gcse_mm.branches.create!(label: 'Statistics', position: 'r', colour: '#4e79a7') # Blue
@diagrams_branch = @statistics_branch.child_branches.create!(label: 'Diagrams')
@summary_statistics_branch = @statistics_branch.child_branches.create!(label: 'Summary Statistics')
@sampling_data_branch = @statistics_branch.child_branches.create!(label: 'Sampling Data')
@probability_branch = @statistics_branch.child_branches.create!(label: 'Probability')
