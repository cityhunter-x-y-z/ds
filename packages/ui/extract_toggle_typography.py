#!/usr/bin/env python3

import json
import sys
from pathlib import Path

def extract_typography_from_node(node, path="", component_name=""):
    """Extract typography information from a Figma node."""
    typography_data = []
    
    # Check if this is a TEXT node
    if node.get('type') == 'TEXT':
        node_name = node.get('name', 'Unknown')
        characters = node.get('characters', '')
        
        # Look for typography information in style or directly in node
        typography_info = {}
        
        # Check for fontFamily, fontSize, etc. in the node
        for prop in ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'textDecoration', 'textTransform']:
            if prop in node:
                typography_info[prop] = node[prop]
        
        # Check style object for typography
        style = node.get('style', {})
        if 'fontFamily' in style:
            typography_info.update(style)
        
        # Check fills for color information
        fills = node.get('fills', [])
        if fills:
            for fill in fills:
                if fill.get('type') == 'SOLID' and 'color' in fill:
                    color = fill['color']
                    if isinstance(color, dict):
                        # Convert RGB to hex
                        r = int(color.get('r', 0) * 255)
                        g = int(color.get('g', 0) * 255)
                        b = int(color.get('b', 0) * 255)
                        typography_info['color'] = f"#{r:02x}{g:02x}{b:02x}"
                    else:
                        typography_info['color'] = color
        
        # Check for boundVariables (design tokens)
        bound_vars = node.get('boundVariables', {})
        
        if typography_info or bound_vars:
            typography_data.append({
                'component': component_name,
                'path': path,
                'node_name': node_name,
                'characters': characters,
                'typography': typography_info,
                'design_tokens': bound_vars,
                'layout': {
                    'width': node.get('absoluteBoundingBox', {}).get('width'),
                    'height': node.get('absoluteBoundingBox', {}).get('height')
                }
            })
    
    # Recursively check children
    children = node.get('children', [])
    for child in children:
        child_path = f"{path} > {child.get('name', 'Unknown')}" if path else child.get('name', 'Unknown')
        typography_data.extend(extract_typography_from_node(child, child_path, component_name))
    
    return typography_data

def analyze_figma_data(file_path):
    """Analyze Figma data and extract typography information."""
    with open(file_path, 'r') as f:
        data = json.load(f)
    
    all_typography = []
    
    # Navigate through the data structure
    nodes = data.get('nodes', {})
    
    for node_id, node_data in nodes.items():
        document = node_data.get('document', {})
        component_name = document.get('name', 'Unknown Component')
        
        print(f"\n🔍 Analyzing component: {component_name}")
        
        # Extract typography from this node and its children
        typography_info = extract_typography_from_node(document, "", component_name)
        all_typography.extend(typography_info)
        
        if typography_info:
            print(f"   Found {len(typography_info)} text elements")
            for typo in typography_info:
                print(f"     - {typo['node_name']}: '{typo['characters']}'")
    
    return all_typography

def main():
    figma_file = Path("/mnt/e/Projects/ds/packages/ui/figma_toggle_data.json")
    
    if not figma_file.exists():
        print(f"❌ Figma data file not found: {figma_file}")
        return
    
    print("🎨 Extracting Typography Specifications from Figma Toggle Components")
    print("=" * 70)
    
    try:
        typography_data = analyze_figma_data(figma_file)
        
        if not typography_data:
            print("❌ No typography data found in the Figma file")
            return
        
        # Group by component
        by_component = {}
        for typo in typography_data:
            component = typo['component']
            if component not in by_component:
                by_component[component] = []
            by_component[component].append(typo)
        
        print(f"\n📊 TYPOGRAPHY SUMMARY")
        print("=" * 50)
        
        for component, typos in by_component.items():
            print(f"\n🏷️  {component}")
            print("-" * 40)
            
            for typo in typos:
                print(f"\n   📝 {typo['node_name']}")
                print(f"      Text: '{typo['characters']}'")
                print(f"      Path: {typo['path']}")
                
                if typo['typography']:
                    print("      Typography:")
                    for key, value in typo['typography'].items():
                        print(f"        {key}: {value}")
                
                if typo['design_tokens']:
                    print("      Design Tokens:")
                    for key, value in typo['design_tokens'].items():
                        print(f"        {key}: {value}")
                
                if typo['layout']['width'] or typo['layout']['height']:
                    print(f"      Size: {typo['layout']['width']}px × {typo['layout']['height']}px")
        
        # Save detailed analysis
        output_file = Path("/mnt/e/Projects/ds/packages/ui/toggle_typography_analysis.json")
        with open(output_file, 'w') as f:
            json.dump({
                'summary': f"Found {len(typography_data)} text elements across {len(by_component)} components",
                'components': by_component,
                'all_typography': typography_data
            }, f, indent=2)
        
        print(f"\n💾 Detailed analysis saved to: {output_file}")
        
    except Exception as e:
        print(f"❌ Error analyzing Figma data: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()