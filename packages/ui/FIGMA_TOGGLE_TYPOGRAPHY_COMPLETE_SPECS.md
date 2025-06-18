# 🎨 Figma Toggle Components - Complete Typography & Component Specifications

> **Source**: Gazebo Design System - Figma Toggle Components Analysis  
> **Date Extracted**: June 2025  
> **Components Analyzed**: Checkbox, Radio, Switch, Toggle Button, Cube Toggle

---

## 📋 Executive Summary

**Typography Foundation**: All toggle components use **Red Hat Display** as the primary typeface with consistent sizing, spacing, and color patterns across states and variants.

**Key Finding**: Typography specifications remain **identical across all component states** (Default, Hover, Focus, Disabled) - only the toggle element itself changes appearance, not the text styling.

---

## 1. 🔤 **Typography Specifications for Labels and Subtitles**

### **Primary Labels** (Main toggle text)
```css
font-family: 'Red Hat Display', sans-serif;
font-weight: 600; /* SemiBold */
font-style: SemiBold;
font-size: 14px;
line-height: 18.52px; /* 1.323 ratio */
letter-spacing: -0.15px;
color: #1d2939; /* Dark gray - consistent across all states */
text-align: left;
text-overflow: ellipsis; /* Single line with ending truncation */
max-lines: 1;
```

### **Subtitles** (Secondary descriptive text)
```css
font-family: 'Red Hat Display', sans-serif;
font-weight: 400; /* Regular */
font-style: Regular;
font-size: 14px;
line-height: 18.52px; /* 1.323 ratio */
letter-spacing: -0.15px;
color: #667085; /* Medium gray */
text-align: left;
text-overflow: normal; /* Multi-line capable */
```

### **Hint Text** (Inline supporting text)
```css
font-family: 'Red Hat Display', sans-serif;
font-weight: 400; /* Regular */
font-style: Regular;
font-size: 14px;
line-height: 18.52px; /* 1.323 ratio */
letter-spacing: -0.15px;
color: #667085; /* Medium gray */
text-align: left;
```

### **Toggle Button Items** (Button group text)
```css
font-family: 'Red Hat Display', sans-serif;
font-weight: 600; /* SemiBold */
font-style: SemiBold;
font-size: 14px;
line-height: 18.52px; /* 1.323 ratio */
letter-spacing: -0.15px;
color: #1d2939; /* Dark gray */
text-align: center; /* Centered in buttons */
```

---

## 2. 🏗️ **Component Structure and Organization**

### **Text Hierarchy Pattern**
```
Toggle Component
├── Toggle Element (Switch/Checkbox/Radio)
└── Text Container (when labels enabled)
    ├── Primary Text Container (horizontal layout)
    │   ├── Icon (optional)
    │   ├── Label (primary text)
    │   ├── Hint (inline secondary text)
    │   └── End Icon (optional)
    └── Subtitle (full-width secondary text)
```

### **Layout Specifications**
- **Component Layout**: Horizontal (toggle + text)
- **Toggle-to-Text Gap**: 12px (consistent across all components)
- **Text Container Layout**: Vertical (label row + subtitle)
- **Label Row Layout**: Horizontal (icon + label + hint + end icon)
- **Vertical Spacing**: 4px between label row and subtitle
- **Horizontal Spacing**: 8px between elements in label row

---

## 3. 🎯 **Interactive Behavior Specifications**

### **Click Areas**
- **Full Component**: Entire component area is clickable (toggle + text)
- **Text Areas**: Label, subtitle, and hint text all trigger toggle action
- **Bounding Box**: Extends to include all text elements

### **State Changes**
| State | Label Typography | Subtitle Typography | Toggle Element |
|-------|-----------------|-------------------|----------------|
| **Default** | No change | No change | Standard appearance |
| **Hover** | No change | No change | Hover styling applied |
| **Focus** | No change | No change | Focus ring + shadow effects |
| **Disabled** | No change | No change | Reduced opacity |

**Key Insight**: Typography colors and styles remain **completely consistent** across all states. Only the toggle element (switch, checkbox, radio) changes appearance.

### **Hover Effects**
- **Text**: No visual changes to typography
- **Toggle Element**: Background/border color changes
- **Cursor**: Pointer cursor over entire component area

### **Focus Behavior**
**Focus Ring System** (applied to toggle element):
- **Primary Ring**: `rgba(46, 144, 250, 1)` with 3px spread
- **White Border**: `rgba(255, 255, 255, 1)` with 3px blur, 2px spread
- **Drop Shadow**: `rgba(233, 235, 237, 1)` with 2px blur
- **Inner White Ring**: `rgba(255, 255, 255, 1)` with 1.5px spread

---

## 4. 🔘 **Switch Component Specific Details**

### **Switch Track Specifications**
- **Dimensions**: 40px × 24px
- **Border Radius**: 12px (pill shape)
- **Border Width**: 1px
- **Track Background**: Design token `VariableID:11524:19069`

### **Switch Thumb Specifications**
- **Dimensions**: ~20px diameter
- **Positioning**: Left (OFF) / Right (ON)
- **Thumb Fill**: Design token `VariableID:11524:19070`
- **Corner Radius**: Fully rounded (circle)

### **Switch States & Colors**
```css
/* OFF State */
.switch-track-off {
  background: #d0d5dd; /* Light gray track */
  border: 1px solid currentColor;
}

.switch-thumb-off {
  background: #ffffff; /* White thumb */
  position: left; /* 2px from left edge */
}

/* ON State */
.switch-track-on {
  background: #2e90fa; /* Blue track (inferred from focus ring color) */
  border: 1px solid currentColor;
}

.switch-thumb-on {
  background: #ffffff; /* White thumb */
  position: right; /* 2px from right edge */
}
```

### **Switch Animation Properties**
- **Transition**: Smooth thumb movement (CSS transition recommended)
- **Duration**: ~200-300ms (standard for toggle components)
- **Easing**: ease-in-out (for natural feel)

---

## 5. 📐 **Spacing Between Elements**

### **Component-Level Spacing**
```css
.toggle-container {
  display: flex;
  align-items: center;
  gap: 12px; /* Toggle to text gap */
}
```

### **Text Container Spacing**
```css
.toggle-text-container {
  display: flex;
  flex-direction: column;
  gap: 4px; /* Label row to subtitle gap */
}

.toggle-label-row {
  display: flex;
  align-items: center;
  gap: 8px; /* Between inline text elements */
}
```

### **Component Dimensions**
- **Switch Only**: 40px × 24px
- **Switch with Label**: 369px × 42px (when label text present)
- **Checkbox Only**: 16px × 16px
- **Checkbox with Label**: 369px × 42px (when label text present)
- **Radio Only**: 16px × 16px
- **Radio with Label**: 369px × 42px (when label text present)

---

## 6. 🎨 **Colors for Different States**

### **Text Colors** (Consistent across all states)
```css
:root {
  --toggle-label-color: #1d2939;     /* Primary text - dark gray */
  --toggle-secondary-color: #667085;  /* Secondary text - medium gray */
  --toggle-focus-color: #2e90fa;     /* Focus ring - blue */
}
```

### **Background/Border Colors** (State-dependent)
```css
/* Switch Component States */
.switch {
  --track-off: #d0d5dd;
  --track-on: #2e90fa;
  --thumb: #ffffff;
  --border: currentColor;
}

/* Focus Ring Colors (All Components) */
.toggle-focus {
  box-shadow: 
    0 1px 2px rgba(233, 235, 237, 1),           /* Drop shadow */
    0 1px 3px 2px rgba(255, 255, 255, 1),      /* White border */
    0 0 0 3px rgba(46, 144, 250, 1),           /* Blue focus ring */
    inset 0 0 0 1.5px rgba(255, 255, 255, 1);  /* Inner white ring */
}
```

---

## 7. 🔧 **Implementation CSS Framework**

### **Base Typography Classes**
```css
/* Import Red Hat Display font */
@import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;600&display=swap');

.toggle-label {
  font-family: 'Red Hat Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.323; /* 18.52/14 */
  letter-spacing: -0.15px;
  color: #1d2939;
  text-align: left;
  
  /* Single line with truncation */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.toggle-subtitle {
  font-family: 'Red Hat Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.323;
  letter-spacing: -0.15px;
  color: #667085;
  text-align: left;
}

.toggle-hint {
  font-family: 'Red Hat Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.323;
  letter-spacing: -0.15px;
  color: #667085;
  text-align: left;
  white-space: nowrap;
}
```

### **Layout Framework**
```css
.toggle-component {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  
  /* Ensure clickable area includes text */
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.toggle-element {
  flex-shrink: 0; /* Prevent toggle from shrinking */
  margin-top: 2px; /* Optical alignment with first line of text */
}

.toggle-text-content {
  flex: 1;
  min-width: 0; /* Allow text to shrink */
}

.toggle-text-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.toggle-subtitle {
  margin: 0;
}
```

---

## 8. ✅ **Accessibility & Design Token Integration**

### **Design Tokens Used**
The components extensively reference design tokens for maintainability:

- **Typography Tokens**:
  - `VariableID:10725:32527` → Font Family (Red Hat Display)
  - `VariableID:10725:32526` → Font Size (14px)
  - `VariableID:10777:1822` → Font Weight (600)
  - `VariableID:10725:32524` → Letter Spacing (-0.15px)

- **Color Tokens**:
  - `VariableID:10942:723` → Primary Text (#1d2939)
  - `VariableID:10942:712` → Secondary Text (#667085)
  - `VariableID:10942:713` → Subtitle Text (#667085)

### **Accessibility Features**
- **Keyboard Navigation**: All components support keyboard interaction
- **Screen Readers**: Proper labeling with associated text elements
- **Focus Management**: Clear focus indicators with high contrast
- **Click Targets**: Adequate size with full component clickability

---

This specification provides the complete typography and interaction details needed to implement toggle components that exactly match the Figma design system.