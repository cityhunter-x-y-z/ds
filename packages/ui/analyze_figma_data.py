#!/usr/bin/env python3

import json

def extract_design_tokens(node_data, component_name):
    print(f'\n=== DESIGN TOKENS FOR {component_name} ===')
    
    def extract_bound_variables(obj, prefix=''):
        tokens = {}
        if isinstance(obj, dict):
            if 'boundVariables' in obj:
                for key, value in obj['boundVariables'].items():
                    if isinstance(value, dict) and 'id' in value:
                        tokens[f'{prefix}{key}'] = value['id']
                    elif isinstance(value, list):
                        for i, item in enumerate(value):
                            if isinstance(item, dict) and 'id' in item:
                                tokens[f'{prefix}{key}[{i}]'] = item['id']
            for key, value in obj.items():
                if key != 'boundVariables':
                    tokens.update(extract_bound_variables(value, f'{prefix}{key}.'))
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                tokens.update(extract_bound_variables(item, f'{prefix}[{i}].'))
        return tokens
    
    tokens = extract_bound_variables(node_data)
    
    if tokens:
        print('Design Tokens Used:')
        for token_path, token_id in list(tokens.items())[:15]:  # Show first 15
            print(f'  {token_path}: {token_id}')
        if len(tokens) > 15:
            print(f'  ... and {len(tokens) - 15} more tokens')
    else:
        print('No design tokens found')

def extract_detailed_specs(node_data, component_name):
    print(f'\n=== DETAILED SPECIFICATIONS FOR {component_name} ===')
    
    if 'document' in node_data and 'children' in node_data['document']:
        # Show specs for each state
        states = {}
        for child in node_data['document']['children']:
            variant_name = child.get('name', 'Unknown')
            
            # Parse variant properties from name
            props = {}
            if '=' in variant_name:
                parts = variant_name.split(', ')
                for part in parts:
                    if '=' in part:
                        key, value = part.split('=', 1)
                        props[key.strip()] = value.strip()
            
            state = props.get('State', 'Unknown')
            toggle = props.get('Toggle', 'Unknown')
            
            if state not in states:
                states[state] = {}
            if toggle not in states[state]:
                states[state][toggle] = {}
            
            # Extract design properties
            specs = {}
            
            # Dimensions
            if 'absoluteBoundingBox' in child:
                box = child['absoluteBoundingBox']
                specs['width'] = f"{box.get('width', 0)}px"
                specs['height'] = f"{box.get('height', 0)}px"
            
            # Colors
            if 'fills' in child and child['fills']:
                for i, fill in enumerate(child['fills']):
                    if fill.get('type') == 'SOLID' and 'color' in fill:
                        color = fill['color']
                        rgba = f"rgba({int(color.get('r', 0)*255)}, {int(color.get('g', 0)*255)}, {int(color.get('b', 0)*255)}, {color.get('a', 1)})"
                        specs[f'fill_{i}'] = rgba
            
            if 'strokes' in child and child['strokes']:
                for i, stroke in enumerate(child['strokes']):
                    if stroke.get('type') == 'SOLID' and 'color' in stroke:
                        color = stroke['color']
                        rgba = f"rgba({int(color.get('r', 0)*255)}, {int(color.get('g', 0)*255)}, {int(color.get('b', 0)*255)}, {color.get('a', 1)})"
                        specs[f'stroke_{i}'] = rgba
            
            # Other properties
            if 'strokeWeight' in child:
                specs['strokeWeight'] = f"{child['strokeWeight']}px"
            if 'cornerRadius' in child:
                specs['cornerRadius'] = f"{child['cornerRadius']}px"
            if 'layoutMode' in child:
                specs['layoutMode'] = child['layoutMode']
            if 'itemSpacing' in child:
                specs['itemSpacing'] = f"{child['itemSpacing']}px"
            
            states[state][toggle] = specs
        
        # Display organized specs
        for state, toggles in states.items():
            print(f'\n  {state} State:')
            for toggle, specs in toggles.items():
                print(f'    {toggle} Toggle:')
                for prop, value in specs.items():
                    print(f'      {prop}: {value}')

def main():
    # Load the JSON data
    with open('figma_toggle_data.json', 'r') as f:
        data = json.load(f)

    # Component mapping
    components = {
        '396:13807': '1.0 Checkbox',
        '392:10690': '2.0 Radio', 
        '388:9960': '3.0 Switch',
        '416:9646': '4.0 Toggle Button',
        '1206:89512': '5.0 Cube/Toggle'
    }

    # Extract data for each component
    for node_id, component_name in components.items():
        if node_id in data.get('nodes', {}):
            extract_design_tokens(data['nodes'][node_id], component_name)
            extract_detailed_specs(data['nodes'][node_id], component_name)

if __name__ == '__main__':
    main()