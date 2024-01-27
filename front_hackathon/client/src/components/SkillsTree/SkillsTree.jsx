import Tree from 'react-d3-tree';
import PropTypes from 'prop-types';

export default function SkillsTree() {
  const orgChart = {
    name: 'Default Name', 
    children: [
      {
        name: 'Default Name',
        attributes:
          ['Skill1',
          'Skill2',
          'Skill3',
          'Skill4'],
        children: [
          {
            name: 'Default Name', 
          },
          {
            name:"Trial"
          }
        ],
      },
    ],
  };

  return (
    <div id="treeWrapper" className=" align-top flex justify-start w-32">
      <Tree data={orgChart} className="w-32"/>
    </div>
  );
}

SkillsTree.propTypes = {
  skill: PropTypes.shape({
    name: PropTypes.string,
  }),
  location: PropTypes.shape({
    name: PropTypes.string,
  }),
  duration: PropTypes.string,
  description: PropTypes.shape({
    text: PropTypes.string,
  }),
};
