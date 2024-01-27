import Tree from "react-d3-tree";
import allData from "../assets/data/data.json";
import { useCenteredTree } from "../assets/helpers";

const containerStyles = {
  display: "lex",
  width: "100vw",
  height: "80vh",
  margin: "0 auto",
  overflowY: "auto",
  zoom: "0.9",
  top: "-1000",
  verticalAlign: "top"
};

const renderReactSvgNode = ({ nodeDatum, toggleNode }) => (
  <g className="h-20">
    <rect width="20" height="20" x="-10" onClick={toggleNode} />
    <text fill="black" strokeWidth="1" x="20">
      {nodeDatum.name}
    </text>
    {nodeDatum.attributes?.department && (
      <text fill="black" x="20" dy="20" strokeWidth="1">
        Department: {nodeDatum.attributes?.department}
      </text>
    )}
  </g>
);

export default function Recruiter() {
  const [dimensions, translate, containerRef] = useCenteredTree();

  return (
    <div className="min-h-screen">
      <h1>Mon espace personnel</h1>
      <h2>Mon arbre de compétences</h2>
      <div style={containerStyles} className="h-2000" ref={containerRef}>
        <Tree
          data={allData}
          dimensions={dimensions}
          translate={translate}
          renderCustomNodeElement={renderReactSvgNode}
          orientation="vertical"
          top="-900px"
        />
      </div>
    </div>
  );
}

