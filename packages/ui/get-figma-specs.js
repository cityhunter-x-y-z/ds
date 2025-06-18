// Script to fetch Figma Label component specifications
// Run with: node get-figma-specs.js
// You'll need to set FIGMA_TOKEN environment variable

const FIGMA_FILE_ID = '7WfEeCID05qU0gdKCtJHHY';
const LABEL_NODE_ID = '502-27886';

async function getFigmaSpecs() {
  const token = process.env.FIGMA_TOKEN;
  
  if (!token) {
    console.error('Please set FIGMA_TOKEN environment variable');
    console.log('Get your token from: https://www.figma.com/developers/api#access-tokens');
    return;
  }

  try {
    // Get the specific node
    const nodeResponse = await fetch(
      `https://api.figma.com/v1/files/${FIGMA_FILE_ID}/nodes?ids=${LABEL_NODE_ID}`,
      {
        headers: {
          'X-Figma-Token': token
        }
      }
    );

    if (!nodeResponse.ok) {
      throw new Error(`HTTP error! status: ${nodeResponse.status}`);
    }

    const nodeData = await nodeResponse.json();
    
    // Get component sets (variants)
    const componentResponse = await fetch(
      `https://api.figma.com/v1/files/${FIGMA_FILE_ID}/component_sets`,
      {
        headers: {
          'X-Figma-Token': token
        }
      }
    );

    const componentData = await componentResponse.json();
    
    console.log('=== FIGMA LABEL SPECIFICATIONS ===');
    console.log('\nNode Data:');
    console.log(JSON.stringify(nodeData, null, 2));
    
    console.log('\nComponent Sets:');
    console.log(JSON.stringify(componentData, null, 2));
    
    // Save to file
    const fs = require('fs');
    fs.writeFileSync('./figma-label-specs.json', JSON.stringify({
      nodes: nodeData,
      componentSets: componentData
    }, null, 2));
    
    console.log('\nSpecifications saved to: figma-label-specs.json');
    
  } catch (error) {
    console.error('Error fetching Figma specs:', error);
  }
}

getFigmaSpecs();