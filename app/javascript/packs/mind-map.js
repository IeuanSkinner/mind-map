import * as d3 from "d3";

const mind_maps = [...document.querySelectorAll("[data-branches]")];
const padding = 0;
const width = window.innerWidth - padding;
const height = window.innerHeight - padding;

const svg = d3
  .select("svg#visualization")
  .attr("width", width)
  .attr("height", height);

const add_branches = (branches, left, root) => {
  branches
    .selectAll("g")
    .data(root.links())
    .join("path")
    .attr("stroke", (d) => d.target.data.colour)
    .attr(
      "d",
      d3
        .linkHorizontal()
        .x((d) => (left ? -d.y : d.y))
        .y((d) => d.x)
    );
};

mind_maps.forEach((m, i) => {
  const branch_data = JSON.parse(m.dataset.branches);
  console.log(i);
  console.log(branch_data);

  const left_branches = {
    ...branch_data,
    children: branch_data.children.filter((branch) => branch.position === "l"),
  };
  const right_branches = {
    ...branch_data,
    children: branch_data.children.filter((branch) => branch.position === "r"),
  };

  const left_root = d3.hierarchy(left_branches);
  const right_root = d3.hierarchy(right_branches);

  // Compute the layout
  const dx = 15;
  const dy = 75;
  d3.tree().nodeSize([dx, dy])(left_root);
  d3.tree().nodeSize([dx, dy])(right_root);

  svg.attr("viewBox", [-(width / 2), -(height / 1.5), width, height * 1.5]);

  const mind_map = svg
    .append("g")
    .attr("width", "33%")
    .attr("height", height)
    .attr("transform", `translate(${(i - 1) * 750}, 0)`);

  const branches = mind_map
    .append("g")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-opacity", 1)
    .attr("stroke-linecap", "round")
    .attr("stroke-linejoin", "round")
    .attr("stroke-width", 2);

  add_branches(branches, true, left_root);
  add_branches(branches, false, right_root);
});
