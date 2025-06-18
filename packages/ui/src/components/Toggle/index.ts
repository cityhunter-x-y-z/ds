/* ===================================
   TOGGLE COMPONENTS EXPORTS
   File: packages/ui/src/components/Toggle/index.ts
   Based on Figma Toggle specifications
   ================================== */

// Checkbox component exports
export { Checkbox } from './Checkbox';
export type { CheckboxProps, CheckboxState, CheckboxToggle } from './Checkbox.types';
export { 
  CHECKBOX_DIMENSIONS, 
  CHECKBOX_COLORS,
  isCheckboxChecked,
  isCheckboxIndeterminate,
  isCheckboxDisabled,
  getCheckboxValue
} from './Checkbox.types';

// Radio component exports
export { Radio, RadioGroup } from './Radio';
export type { RadioProps, RadioGroupProps, RadioState, RadioToggle } from './Radio.types';
export { 
  RADIO_DIMENSIONS, 
  RADIO_COLORS,
  isRadioChecked,
  isRadioDisabled,
  getRadioValue
} from './Radio.types';

// Switch component exports
export { Switch } from './Switch';
export type { SwitchProps, SwitchState, SwitchToggle } from './Switch.types';
export { 
  SWITCH_DIMENSIONS, 
  SWITCH_COLORS,
  isSwitchChecked,
  isSwitchDisabled,
  getSwitchValue
} from './Switch.types';

// Toggle Button component exports
export { ToggleButton } from './ToggleButton';
export type { 
  ToggleButtonProps, 
  ToggleButtonItemProps, 
  ToggleButtonItem 
} from './ToggleButton.types';
export { 
  TOGGLE_BUTTON_DIMENSIONS, 
  TOGGLE_BUTTON_COLORS,
  TOGGLE_BUTTON_ANIMATION,
  isToggleButtonItemSelected,
  isToggleButtonItemDisabled,
  getToggleButtonSelectedItems
} from './ToggleButton.types';

// Cube Toggle component exports
export { CubeToggle } from './CubeToggle';
export type { CubeToggleProps, CubeToggleState, CubeToggleToggle } from './CubeToggle.types';
export { 
  CUBE_TOGGLE_DIMENSIONS, 
  CUBE_TOGGLE_COLORS,
  isCubeToggleChecked,
  isCubeToggleDisabled,
  getCubeToggleValue
} from './CubeToggle.types';