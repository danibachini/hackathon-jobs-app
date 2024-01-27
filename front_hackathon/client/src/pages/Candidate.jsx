import Tree from "react-d3-tree";
import allData from "../assets/data/data.json";
import { useCenteredTree } from "../assets/helpers";
import LinkedinIcon from "../../src/assets/images/linkedin.png";
import GithubIcon from "../../src/assets/images/github.png";
import PortfolioIcon from "../../src/assets/images/portfolio.png"

const containerStyles = {
    display: "flex",
    width: "100vw",
    height: "80vh",
    margin: "0 auto",
    overflowY: "auto",
    verticalAlign: "start"
};

const renderReactSvgNode = ({ nodeDatum, toggleNode }) => (
    <g>
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

export default function Candidate() {
    const [dimensions, translate, containerRef] = useCenteredTree();

    return (
        <div className="min-h-screen">
            <h1 className="text-center text-4xl font-bold mt-10">Mon espace personnel</h1>
            <section className="bg-slate-200 mt-10">
                <h2 className="text-xl font-bold pt-5 pl-5">Mon arbre de compétences</h2>
                <div style={containerStyles} ref={containerRef}
                    className="flex justify-start top-0 w-26">
                    <Tree
                        data={allData}
                        dimensions={dimensions}
                        translate={translate}
                        renderCustomNodeElement={renderReactSvgNode}
                        orientation="vertical"
                    />
                </div>
            </section>
            <section className=" bg-slate-50 mt-10 mb-10">
                <div>
                    <h2 className="text-xl font-bold pt-5 pl-5">Ma veille</h2>
                    <a href="https://app.daily.dev/DailyDevTips" className="flex justify-center pt-5 pb-5 align-center"><img src="https://api.daily.dev/devcards/b2a0b896ef724e68a2364c727e8e9e6e.png?r=20z" width="400" alt="Chris Bongers's Dev Card" /></a>
                </div>
            </section>
        </div>
    );
}

