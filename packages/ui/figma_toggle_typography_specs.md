# Figma Toggle Components - Typography Specifications

## Overview
This document contains the exact typography specifications extracted from the Figma Toggle components in the Gazebo Design System. The analysis covered 104 text elements across 5 toggle components: Checkbox, Radio, Switch, Toggle Button, and Cube Toggle.

---

## 🎯 Key Typography Patterns

### **Primary Labels**
- **Font Family**: Red Hat Display
- **Font Weight**: 600 (SemiBold)
- **Font Size**: 14px
- **Line Height**: 18.52px (≈1.32 ratio)
- **Letter Spacing**: -0.15px
- **Color**: #1d2939 (Dark Gray)
- **Text Align**: LEFT, TOP
- **Max Lines**: 1 (with truncation: ENDING)

### **Subtitle Text**
- **Font Family**: Red Hat Display
- **Font Weight**: 400 (Regular)
- **Font Size**: 14px
- **Line Height**: 18.52px (≈1.32 ratio)
- **Letter Spacing**: -0.15px
- **Color**: #667085 (Medium Gray)
- **Text Align**: LEFT, TOP
- **Auto Resize**: HEIGHT

### **Hint Text**
- **Font Family**: Red Hat Display
- **Font Weight**: 400 (Regular)
- **Font Size**: 14px
- **Line Height**: 18.52px (≈1.32 ratio)
- **Letter Spacing**: -0.15px
- **Color**: #667085 (Medium Gray)
- **Text Align**: LEFT, TOP
- **Auto Resize**: WIDTH_AND_HEIGHT

### **Toggle Button Items**
- **Font Family**: Red Hat Display
- **Font Weight**: 600 (SemiBold)
- **Font Size**: 14px
- **Line Height**: 18.52px (≈1.32 ratio)
- **Letter Spacing**: -0.15px
- **Color**: #1d2939 (Dark Gray)
- **Text Align**: CENTER, CENTER

---

## 🏷️ Component-Specific Breakdown

### **1.0 Checkbox**
All text elements follow the standard patterns above:
- **Labels**: SemiBold 14px, #1d2939, -0.15px letter spacing
- **Subtitles**: Regular 14px, #667085, -0.15px letter spacing
- **Hints**: Regular 14px, #667085, -0.15px letter spacing

### **2.0 Radio**
Identical typography to Checkbox components.

### **3.0 Switch**
Identical typography to Checkbox and Radio components.

### **4.0 Toggle Button**
- **Item Text**: SemiBold 14px, #1d2939, -0.15px letter spacing
- **Text Alignment**: CENTER (both horizontal and vertical)
- **Color Variations**: 
  - Selected/Active: #1d2939 (Dark Gray)
  - Some variants: #667085 (Medium Gray) for less prominent states

### **5.0 Cube Toggle**
- **Label Text**: SemiBold 14px, #1d2939, -0.15px letter spacing
- **Consistent** with other component label styling

---

## 🎨 Typography Hierarchy

### **Text Element Types**
1. **Primary Labels** (Highest Priority)
   - Font Weight: 600 (SemiBold)
   - Color: #1d2939 (Darkest)
   - Purpose: Main toggle label/title

2. **Secondary Text** (Medium Priority)
   - Font Weight: 400 (Regular)
   - Color: #667085 (Medium Gray)
   - Purpose: Subtitles, hints, supporting information

3. **Interactive Text** (Context Dependent)
   - Font Weight: 600 (SemiBold) for toggle button items
   - Color: #1d2939 (Dark) or #667085 (Medium) based on state

---

## 📐 Layout & Spacing

### **Text Containers**
- **Item Spacing**: 8px between text elements in horizontal layouts
- **Vertical Spacing**: 4px between labels and subtitles in vertical layouts
- **Text Truncation**: Single line with "ENDING" truncation for primary labels
- **Auto Resize**: 
  - Labels: WIDTH_AND_HEIGHT
  - Subtitles: HEIGHT only
  - Hints: WIDTH_AND_HEIGHT

### **Component Layout**
- **Horizontal Layout**: Primary toggle element + text container
- **Gap Between Toggle & Text**: 12px (consistent across all components)
- **Text Alignment**: 
  - Horizontal: LEFT (default), CENTER (toggle buttons)
  - Vertical: TOP (labels/text), CENTER (toggle buttons)

---

## 🔧 Design Tokens Referenced

The Figma components extensively use design tokens for consistency:

### **Font Properties**
- `VariableID:10725:32527` - Font Family (Red Hat Display)
- `VariableID:10725:32526` - Font Size (14px)
- `VariableID:10777:1822` - Font Style (SemiBold)
- `VariableID:10725:32524` - Letter Spacing (-0.15px)

### **Colors**
- `VariableID:10942:723` - Primary Text Color (#1d2939)
- `VariableID:10942:712` - Secondary Text Color (#667085)
- `VariableID:10942:713` - Subtitle Text Color (#667085)

### **Spacing**
- `VariableID:10725:32522` - Paragraph Spacing (2px)
- Item spacing and layout gaps are also token-based

---

## 🎯 CSS Implementation Guidelines

### **Base Typography Classes**
```css
/* Primary Labels */
.toggle-label {
  font-family: 'Red Hat Display', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.32; /* 18.52px / 14px */
  letter-spacing: -0.15px;
  color: #1d2939;
  text-align: left;
}

/* Secondary Text (Subtitles/Hints) */
.toggle-secondary-text {
  font-family: 'Red Hat Display', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.32;
  letter-spacing: -0.15px;
  color: #667085;
  text-align: left;
}

/* Toggle Button Items */
.toggle-button-item {
  font-family: 'Red Hat Display', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.32;
  letter-spacing: -0.15px;
  color: #1d2939;
  text-align: center;
}
```

### **Layout Spacing**
```css
.toggle-container {
  display: flex;
  align-items: center;
  gap: 12px; /* Space between toggle and text */
}

.toggle-text-container {
  display: flex;
  flex-direction: column;
  gap: 4px; /* Space between label and subtitle */
}

.toggle-horizontal-text {
  display: flex;
  align-items: center;
  gap: 8px; /* Space between inline text elements */
}
```

---

## 🔍 Interactive States

### **State Consistency**
All toggle components maintain **identical typography** across different states:
- **Default**: Typography remains consistent
- **Hover**: Typography remains consistent
- **Focus**: Typography remains consistent  
- **Disabled**: Typography remains consistent (only color/opacity may change)

### **Color Variations by State**
The typography colors extracted show:
- **Primary text**: Always #1d2939 (consistent across states)
- **Secondary text**: Always #667085 (consistent across states)
- **State changes affect**: Background colors, borders, and toggle element colors - NOT text colors

---

This specification provides the exact typography details needed to implement toggle components that match the Figma design system precisely.