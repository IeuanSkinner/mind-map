import * as d3 from "d3";

const mind_maps = document.querySelectorAll("[data-mind-map]");
const padding = 0;
const width = window.innerWidth - padding;
const height = window.innerHeight - padding;

const svg = d3
  .select("svg#visualization")
  .attr("width", width)
  .attr("height", height);

// mind_maps.forEach((m) => {
const data = JSON.parse(mind_maps[1].dataset.mindMap);
console.log(data);
const left_branches = {
  ...data,
  children: data.children.filter((branch) => branch.position === "l"),
};
const right_branches = {
  ...data,
  children: data.children.filter((branch) => branch.position === "r"),
};

console.log(left_branches);
console.log(right_branches);

// const root = d3.hierarchy(data);

const left_root = d3.hierarchy(left_branches);
const right_root = d3.hierarchy(right_branches);

// Compute the layout
const dx = 15;
const dy = 75;
d3.tree().nodeSize([dx, dy])(left_root);
d3.tree().nodeSize([dx, dy])(right_root);

svg.attr("viewBox", [-(width / 2), -(height / 1.5), width, height * 1.5]);

const mind_map = svg.append("g").attr("width", "33%").attr("height", height);

const branches = mind_map
  .append("g")
  .attr("fill", "none")
  .attr("stroke", "black")
  .attr("stroke-opacity", 1)
  .attr("stroke-linecap", "round")
  .attr("stroke-linejoin", "round")
  .attr("stroke-width", 2);

branches
  .selectAll("g")
  .data(left_root.links())
  .join("path")
  .attr("stroke", (d) => d.target.data.colour)
  .attr(
    "d",
    d3
      .linkHorizontal()
      .x((d) => -d.y)
      .y((d) => d.x)
  );

branches
  .selectAll("g")
  .data(right_root.links())
  .join("path")
  .attr("stroke", (d) => d.target.data.colour)
  .attr(
    "d",
    d3
      .linkHorizontal()
      .x((d) => d.y)
      .y((d) => d.x)
  );
// });
