/* ===================================
   TOGGLE BUTTON STORYBOOK STORIES - Figma Design System
   File: packages/ui/src/components/Toggle/ToggleButton.stories.tsx
   Based on Figma Toggle Button specifications (Node: 416-9646)
   Multi-item toggle group with 319ms gentle transitions
   ================================== */

import type { Meta, StoryObj } from '@storybook/react';
import { ToggleButton } from './ToggleButton';
import React from 'react';

// Example icons for stories
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 3.5a.5.5 0 0 1 .5.5v3.5H12a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/>
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708L10.5 9.207l-3-3L12.146.146zM11.207 9.5L9 7.293L3.854 12.439a.5.5 0 0 0-.146.353V14.5a.5.5 0 0 0 .5.5h1.707a.5.5 0 0 0 .354-.146L11.207 9.5z"/>
  </svg>
);

const DeleteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
  </svg>
);

const meta: Meta<typeof ToggleButton> = {
  title: 'Components/Toggle/ToggleButton',
  component: ToggleButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Toggle Button component following Figma design specifications. Tab-like selection group with Red Hat Display typography and 319ms gentle transitions. Defaults to single selection (like tabs).'
      }
    }
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of toggle button items'
    },
    selectedItems: {
      control: 'object',
      description: 'Array of selected item IDs'
    },
    multiple: {
      control: 'boolean',
      description: 'Whether multiple items can be selected (defaults to false for tab-like behavior)'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the entire group is disabled'
    },
    showIcons: {
      control: 'boolean',
      description: 'Whether to show icons'
    },
    onChange: {
      action: 'changed',
      description: 'Function called when selection changes'
    },
    className: {
      control: 'text',
      description: 'Custom CSS class'
    }
  }
};

export default meta;
type Story = StoryObj<typeof ToggleButton>;

// ===== BASIC STORIES =====

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = React.useState(['item1']);
    
    const items = [
      { id: 'item1', label: 'Option 1' },
      { id: 'item2', label: 'Option 2' },
      { id: 'item3', label: 'Option 3' }
    ];
    
    return (
      <ToggleButton
        items={items}
        selectedItems={selected}
        onChange={setSelected}
        showIcons={false}
      />
    );
  }
};

export const WithIcons: Story = {
  render: () => {
    const [selected, setSelected] = React.useState(['edit']);
    
    const items = [
      { id: 'add', label: 'Add', icon: <PlusIcon /> },
      { id: 'edit', label: 'Edit', icon: <EditIcon /> },
      { id: 'delete', label: 'Delete', icon: <DeleteIcon /> }
    ];
    
    return (
      <ToggleButton
        items={items}
        selectedItems={selected}
        onChange={setSelected}
        showIcons={true}
      />
    );
  }
};

export const StyleSelector: Story = {
  render: () => {
    const [selected, setSelected] = React.useState(['normal']);
    
    const items = [
      { id: 'normal', label: 'Normal' },
      { id: 'bold', label: 'Bold' },
      { id: 'italic', label: 'Italic' }
    ];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'semibold' }}>
          Text Style Selection
        </h3>
        
        <ToggleButton
          items={items}
          selectedItems={selected}
          onChange={setSelected}
        />
        
        <div style={{ fontSize: '14px', color: '#667085' }}>
          Current style: {selected[0] || 'None'}
        </div>
      </div>
    );
  }
};

export const TabLikeBehavior: Story = {
  render: () => {
    const [selected, setSelected] = React.useState(['overview']);
    
    const items = [
      { id: 'overview', label: 'Overview' },
      { id: 'analytics', label: 'Analytics' },
      { id: 'reports', label: 'Reports' },
      { id: 'settings', label: 'Settings' }
    ];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'semibold' }}>
          Tab Navigation
        </h3>
        
        <ToggleButton
          items={items}
          selectedItems={selected}
          onChange={setSelected}
        />
        
        <div style={{ fontSize: '14px', color: '#667085' }}>
          Current tab: {selected[0] || 'None'}
        </div>
      </div>
    );
  }
};

export const Disabled: Story = {
  render: () => {
    const [selected, setSelected] = React.useState(['option1']);
    
    const items = [
      { id: 'option1', label: 'Option 1' },
      { id: 'option2', label: 'Option 2' },
      { id: 'option3', label: 'Option 3' }
    ];
    
    return (
      <ToggleButton
        items={items}
        selectedItems={selected}
        onChange={setSelected}
        disabled={true}
      />
    );
  }
};

// ===== INTERACTIVE STORIES =====

export const Interactive: Story = {
  render: () => {
    const [selectedTab, setSelectedTab] = React.useState(['dashboard']);
    
    const items = [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'projects', label: 'Projects' },
      { id: 'team', label: 'Team' },
      { id: 'settings', label: 'Settings' }
    ];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'semibold' }}>
          Navigation Tabs
        </h3>
        
        <ToggleButton
          items={items}
          selectedItems={selectedTab}
          onChange={setSelectedTab}
        />
        
        <div style={{ fontSize: '14px', color: '#667085' }}>
          Current tab: {selectedTab[0] || 'None'}
        </div>
      </div>
    );
  }
};

export const InteractiveWithIcons: Story = {
  render: () => {
    const [selectedAction, setSelectedAction] = React.useState<string[]>(['edit']);
    
    const actionItems = [
      { id: 'add', label: 'Add', icon: <PlusIcon /> },
      { id: 'edit', label: 'Edit', icon: <EditIcon /> },
      { id: 'delete', label: 'Delete', icon: <DeleteIcon /> }
    ];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'semibold' }}>
          Action Selector
        </h3>
        
        <ToggleButton
          items={actionItems}
          selectedItems={selectedAction}
          onChange={setSelectedAction}
          showIcons={true}
        />
        
        <div style={{ fontSize: '14px', color: '#667085' }}>
          Selected action: {selectedAction[0] || 'None'}
        </div>
      </div>
    );
  }
};

// ===== SINGLE SELECTION EXAMPLES =====

export const ViewModeSelector: Story = {
  render: () => {
    const [viewMode, setViewMode] = React.useState<string[]>(['grid']);
    
    const viewModes = [
      { id: 'list', label: 'List' },
      { id: 'grid', label: 'Grid' },
      { id: 'card', label: 'Card' }
    ];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'semibold' }}>
          View Mode
        </h3>
        
        <ToggleButton
          items={viewModes}
          selectedItems={viewMode}
          onChange={setViewMode}
        />
        
        <div style={{ fontSize: '14px', color: '#667085' }}>
          Current view: {viewMode[0] || 'None'}
        </div>
      </div>
    );
  }
};

export const FilterSelector: Story = {
  render: () => {
    const [filters, setFilters] = React.useState<string[]>(['active']);
    
    const filterItems = [
      { id: 'all', label: 'All' },
      { id: 'active', label: 'Active' },
      { id: 'inactive', label: 'Inactive' },
      { id: 'pending', label: 'Pending' }
    ];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'semibold' }}>
          Status Filter
        </h3>
        
        <ToggleButton
          items={filterItems}
          selectedItems={filters}
          onChange={setFilters}
        />
        
        <div style={{ fontSize: '14px', color: '#667085' }}>
          Showing: {filters[0] || 'None'} items
        </div>
      </div>
    );
  }
};

// ===== COMPLEX EXAMPLES =====

export const ToolbarExample: Story = {
  render: () => {
    const [formatting, setFormatting] = React.useState<string[]>(['bold']);
    const [alignment, setAlignment] = React.useState<string[]>(['left']);
    
    const formattingItems = [
      { id: 'bold', label: 'Bold' },
      { id: 'italic', label: 'Italic' },
      { id: 'underline', label: 'Underline' }
    ];
    
    const alignmentItems = [
      { id: 'left', label: 'Left' },
      { id: 'center', label: 'Center' },
      { id: 'right', label: 'Right' },
      { id: 'justify', label: 'Justify' }
    ];
    
    return (
      <div style={{ 
        padding: '20px', 
        border: '1px solid #e4e7ec', 
        borderRadius: '8px',
        backgroundColor: '#fff',
        maxWidth: '500px'
      }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: 'semibold' }}>
          Text Editor Toolbar
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 'medium', marginBottom: '8px' }}>
              Text Formatting
            </div>
            <ToggleButton
              items={formattingItems}
              selectedItems={formatting}
              onChange={setFormatting}
                />
          </div>
          
          <div>
            <div style={{ fontSize: '14px', fontWeight: 'medium', marginBottom: '8px' }}>
              Text Alignment
            </div>
            <ToggleButton
              items={alignmentItems}
              selectedItems={alignment}
              onChange={setAlignment}
                />
          </div>
        </div>
        
        <div style={{ marginTop: '16px', fontSize: '12px', color: '#667085' }}>
          Format: {formatting.join(', ') || 'None'} | Align: {alignment[0] || 'None'}
        </div>
      </div>
    );
  }
};

// ===== DISABLED ITEMS =====

export const WithDisabledItems: Story = {
  render: () => {
    const [selected, setSelected] = React.useState(['option1']);
    
    const items = [
      { id: 'option1', label: 'Available' },
      { id: 'option2', label: 'Also Available' },
      { id: 'option3', label: 'Disabled', disabled: true },
      { id: 'option4', label: 'Available' },
      { id: 'option5', label: 'Also Disabled', disabled: true }
    ];
    
    return (
      <ToggleButton
        items={items}
        selectedItems={selected}
        onChange={setSelected}
      />
    );
  }
};

// ===== SIZE VARIATIONS =====

export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'semibold' }}>
        Figma Size Specifications
      </h3>
      
      <div>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 'medium' }}>
          Without Icons (151px × 32px)
        </h4>
        <ToggleButton
          items={[
            { id: 'small', label: 'Small' },
            { id: 'medium', label: 'Medium' },
            { id: 'large', label: 'Large' }
          ]}
          showIcons={false}
          selectedItems={['medium']}
        />
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 'medium' }}>
          With Icons (211px × 32px)
        </h4>
        <ToggleButton
          items={[
            { id: 'add', label: 'Add', icon: <PlusIcon /> },
            { id: 'edit', label: 'Edit', icon: <EditIcon /> },
            { id: 'delete', label: 'Delete', icon: <DeleteIcon /> }
          ]}
          showIcons={true}
          selectedItems={['edit']}
        />
      </div>
    </div>
  )
};