#!/usr/bin/env python3

import json

def extract_component_details(node_data, component_name):
    """Extract detailed specifications for each component including colors, typography, and spacing"""
    print(f'\n{"="*60}')
    print(f'COMPONENT: {component_name}')
    print(f'{"="*60}')
    
    if 'document' not in node_data:
        print('No document found')
        return
    
    doc = node_data['document']
    
    # Print component property definitions
    if 'componentPropertyDefinitions' in doc:
        print('\nCOMPONENT PROPERTIES:')
        for prop_name, prop_data in doc['componentPropertyDefinitions'].items():
            print(f'  • {prop_name}:')
            print(f'    Type: {prop_data.get("type", "Unknown")}')
            if 'variantOptions' in prop_data:
                print(f'    Options: {", ".join(prop_data["variantOptions"])}')
            if 'defaultValue' in prop_data:
                print(f'    Default: {prop_data["defaultValue"]}')
    
    # Analyze variants
    if 'children' in doc:
        print(f'\nVARIANT ANALYSIS ({len(doc["children"])} variants):')
        
        # Group variants by state and toggle
        variants = {}
        for child in doc['children']:
            variant_name = child.get('name', 'Unknown')
            
            # Extract state information from variant name
            state_info = {}
            if '=' in variant_name:
                parts = variant_name.split(', ')
                for part in parts:
                    if '=' in part:
                        key, value = part.split('=', 1)
                        state_info[key.strip()] = value.strip()
            
            # Use state and toggle as grouping keys
            state = state_info.get('State', 'Unknown')
            toggle = state_info.get('Toggle', 'Unknown')
            has_label = state_info.get('Label', 'False') == 'True'
            
            key = f"{state}_{toggle}_{'with_label' if has_label else 'no_label'}"
            
            # Extract design specs
            specs = extract_design_specs(child)
            specs['variant_name'] = variant_name
            specs['has_label'] = has_label
            
            variants[key] = specs
        
        # Display organized specs
        for variant_key, specs in variants.items():
            state, toggle, label_status = variant_key.split('_', 2)
            print(f'\n  ┌─ {state.upper()} State, {toggle.upper()} Toggle ({label_status.replace("_", " ").title()})')
            print(f'  │ Variant: {specs["variant_name"]}')
            
            # Dimensions
            if specs.get('width') and specs.get('height'):
                print(f'  │ Size: {specs["width"]} × {specs["height"]}')
            
            # Colors
            for i, color in enumerate(specs.get('fill_colors', [])):
                print(f'  │ Fill {i+1}: {color}')
            for i, color in enumerate(specs.get('stroke_colors', [])):
                print(f'  │ Border {i+1}: {color}')
            
            # Border and corner properties
            if specs.get('stroke_weight'):
                print(f'  │ Border Width: {specs["stroke_weight"]}')
            if specs.get('corner_radius'):
                print(f'  │ Corner Radius: {specs["corner_radius"]}')
            
            # Layout properties
            if specs.get('layout_mode'):
                print(f'  │ Layout: {specs["layout_mode"]}')
            if specs.get('item_spacing'):
                print(f'  │ Gap: {specs["item_spacing"]}')
            
            # Padding
            padding_props = ['padding_left', 'padding_top', 'padding_right', 'padding_bottom']
            padding_values = [specs.get(prop) for prop in padding_props if specs.get(prop)]
            if padding_values:
                if len(set(padding_values)) == 1:
                    print(f'  │ Padding: {padding_values[0]} (all sides)')
                else:
                    print(f'  │ Padding: {" ".join(padding_values)} (T R B L)')
            
            # Typography (if text is present)
            if specs.get('font_family'):
                print(f'  │ Font: {specs["font_family"]}')
            if specs.get('font_size'):
                print(f'  │ Font Size: {specs["font_size"]}')
            if specs.get('font_weight'):
                print(f'  │ Font Weight: {specs["font_weight"]}')
            if specs.get('line_height'):
                print(f'  │ Line Height: {specs["line_height"]}')
            if specs.get('letter_spacing'):
                print(f'  │ Letter Spacing: {specs["letter_spacing"]}')
            
            # Effects (shadows, etc.)
            if specs.get('effects'):
                for effect in specs['effects']:
                    print(f'  │ Effect: {effect}')
            
            print('  └─')

def extract_design_specs(node):
    """Extract design specifications from a Figma node"""
    specs = {}
    
    # Dimensions
    if 'absoluteBoundingBox' in node:
        box = node['absoluteBoundingBox']
        specs['width'] = f"{box.get('width', 0)}px"
        specs['height'] = f"{box.get('height', 0)}px"
    
    # Fill colors
    if 'fills' in node and node['fills']:
        fill_colors = []
        for fill in node['fills']:
            if fill.get('type') == 'SOLID' and 'color' in fill:
                color = fill['color']
                rgba = f"rgba({int(color.get('r', 0)*255)}, {int(color.get('g', 0)*255)}, {int(color.get('b', 0)*255)}, {color.get('a', 1)})"
                hex_color = rgb_to_hex(color.get('r', 0), color.get('g', 0), color.get('b', 0))
                fill_colors.append(f"{rgba} / {hex_color}")
        specs['fill_colors'] = fill_colors
    
    # Stroke colors
    if 'strokes' in node and node['strokes']:
        stroke_colors = []
        for stroke in node['strokes']:
            if stroke.get('type') == 'SOLID' and 'color' in stroke:
                color = stroke['color']
                rgba = f"rgba({int(color.get('r', 0)*255)}, {int(color.get('g', 0)*255)}, {int(color.get('b', 0)*255)}, {color.get('a', 1)})"
                hex_color = rgb_to_hex(color.get('r', 0), color.get('g', 0), color.get('b', 0))
                stroke_colors.append(f"{rgba} / {hex_color}")
        specs['stroke_colors'] = stroke_colors
    
    # Border properties
    if 'strokeWeight' in node:
        specs['stroke_weight'] = f"{node['strokeWeight']}px"
    
    # Corner radius
    if 'cornerRadius' in node:
        radius = node['cornerRadius']
        if radius >= 999:
            specs['corner_radius'] = "9999px (fully rounded)"
        else:
            specs['corner_radius'] = f"{radius}px"
    
    # Layout properties
    if 'layoutMode' in node:
        specs['layout_mode'] = node['layoutMode']
    if 'itemSpacing' in node:
        specs['item_spacing'] = f"{node['itemSpacing']}px"
    
    # Padding
    for prop in ['paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom']:
        if prop in node:
            key = prop.replace('padding', 'padding_').lower()
            specs[key] = f"{node[prop]}px"
    
    # Typography (search in children for text nodes)
    extract_typography_specs(node, specs)
    
    # Effects
    if 'effects' in node and node['effects']:
        effects = []
        for effect in node['effects']:
            if effect.get('type') == 'DROP_SHADOW':
                effects.append(f"Drop Shadow: {effect}")
            elif effect.get('type') == 'INNER_SHADOW':
                effects.append(f"Inner Shadow: {effect}")
        specs['effects'] = effects
    
    return specs

def extract_typography_specs(node, specs, prefix=''):
    """Recursively extract typography specifications from text nodes"""
    if isinstance(node, dict):
        if node.get('type') == 'TEXT':
            # Font properties
            if 'fontName' in node:
                font = node['fontName']
                specs['font_family'] = font.get('family', 'Unknown')
                specs['font_weight'] = font.get('style', 'Unknown')
            
            if 'fontSize' in node:
                specs['font_size'] = f"{node['fontSize']}px"
            
            if 'lineHeightPx' in node:
                specs['line_height'] = f"{node['lineHeightPx']}px"
            elif 'lineHeightPercent' in node:
                specs['line_height'] = f"{node['lineHeightPercent']}%"
            
            if 'letterSpacing' in node:
                specs['letter_spacing'] = f"{node['letterSpacing']}px"
            
            # Text color
            if 'fills' in node and node['fills']:
                for fill in node['fills']:
                    if fill.get('type') == 'SOLID' and 'color' in fill:
                        color = fill['color']
                        rgba = f"rgba({int(color.get('r', 0)*255)}, {int(color.get('g', 0)*255)}, {int(color.get('b', 0)*255)}, {color.get('a', 1)})"
                        hex_color = rgb_to_hex(color.get('r', 0), color.get('g', 0), color.get('b', 0))
                        specs['text_color'] = f"{rgba} / {hex_color}"
        
        # Recursively search children
        if 'children' in node:
            for child in node['children']:
                extract_typography_specs(child, specs)

def rgb_to_hex(r, g, b):
    """Convert RGB values (0-1) to hex color"""
    return f"#{int(r*255):02x}{int(g*255):02x}{int(b*255):02x}"

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

    # Extract detailed specs for each component
    for node_id, component_name in components.items():
        if node_id in data.get('nodes', {}):
            extract_component_details(data['nodes'][node_id], component_name)

if __name__ == '__main__':
    main()