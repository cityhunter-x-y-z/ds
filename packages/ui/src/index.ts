/* ===================================
   UI LIBRARY MAIN EXPORT
   File: packages/ui/src/index.ts
   ================================== */

// Import theme CSS
import '@gazebo/tokens/src/theme.css';

// Export Button component
export { Button } from './components/Button';
export type { 
  ButtonProps, 
  TextButtonProps, 
  IconButtonProps,
  ButtonVariant,
  ButtonSize,
  IconPosition
} from './components/Button';
export { 
  isIconButton,
  isIconButtonProps,
  isTextButtonProps
} from './components/Button';

// Export Input component
export { Input } from './components/Input';
export type {
  InputProps,
  BaseInputProps,
  TextInputProps,
  SearchInputProps,
  PasswordInputProps,
  CreditCardInputProps,
  NumberInputProps,
  PhoneInputProps,
  CurrencyInputProps,
  SelectInputProps,
  MultiSelectInputProps,
  DatePickerInputProps,
  VerificationInputProps,
  SelectOption,
  InputVariant,
  InputState,
  InputSize,
  LabelPosition
} from './components/Input';
export {
  isTextBasedInput,
  isSearchInput,
  isPasswordInput,
  isCreditCardInput,
  isNumberInput,
  isPhoneInput,
  isCurrencyInput,
  isSelectInput,
  isDatePickerInput,
  isVerificationInput,
  isTextareaInput,
  getInputType,
  isErrorState,
  isSuccessState,
  isWarningState,
  isDisabledState,
  INPUT_STATES,
  INPUT_VARIANTS
} from './components/Input';

// Export Chip component
export { Chip } from './components/Chip';
export type { 
  ChipProps,
  ChipState
} from './components/Chip';
export { 
  isClickableChip,
  isDismissibleChip,
  hasIcon as chipHasIcon,
  hasAvatar,
  hasDot,
  CHIP_STATES
} from './components/Chip';

// Export Link component
export { Link } from './components/Link';
export type { 
  LinkProps,
  InternalLinkProps,
  AllLinkProps,
  LinkVariant,
  LinkSize,
  LinkState
} from './components/Link';
export { 
  isInternalLink,
  isExternalLink,
  hasIcon as linkHasIcon,
  LINK_VARIANTS,
  LINK_SIZES,
  LINK_STATES
} from './components/Link';

// Export Loader component
export { Loader } from './components/Loader';
export type { 
  LoaderProps,
  BaseLoaderProps,
  IndeterminateLoaderProps,
  DeterminateLoaderProps,
  LoaderSize,
  LoaderType
} from './components/Loader';
export { 
  getLoaderSize,
  isValidLoaderSize,
  isDeterminateLoader,
  isIndeterminateLoader,
  LOADER_SIZES
} from './components/Loader';

// Export Label component
export { Label } from './components/Label';
export type { 
  LabelProps,
  BaseLabelProps,
  AllLabelProps,
  LabelSize,
  LabelLayout,
  LabelState
} from './components/Label';
export { 
  getLabelSizeSpecs,
  isRequiredField,
  hasStateStyle,
  LABEL_SIZES
} from './components/Label';

// Export Icons component
export {
  IconWrapper,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  XIcon,
  CheckIcon,
  SearchIcon,
  DownloadIcon,
  UploadIcon,
  AttachmentIcon,
  EditIcon,
  DeleteIcon,
  SettingsIcon,
  InfoIcon,
  WarningIcon,
  ErrorIcon,
  LoadingIcon,
  EyeIcon,
  EyeOffIcon,
  HeartIcon,
  RefreshIcon,
  CreditCardIcon,
  CardVisaIcon,
  CardMastercardIcon,
  CardAmexIcon,
  CardDiscoverIcon,
  ICON_REGISTRY,
  DynamicIcon,
  getIconByName,
  getAvailableIcons
} from './components/Icons';
export type {
  BaseIconProps,
  IconComponent,
  IconName,
  DynamicIconProps,
  IconRegistry,
  IconWrapperProps,
  IconSize,
  IconUtils
} from './components/Icons';

// Export Toggle components (Checkbox, Radio, Switch, ToggleButton, CubeToggle)
export { 
  Checkbox,
  Radio, 
  RadioGroup,
  Switch,
  ToggleButton,
  CubeToggle 
} from './components/Toggle';
export type { 
  CheckboxProps, 
  CheckboxState, 
  CheckboxToggle,
  RadioProps, 
  RadioGroupProps, 
  RadioState, 
  RadioToggle,
  SwitchProps, 
  SwitchState, 
  SwitchToggle,
  ToggleButtonProps, 
  ToggleButtonItemProps, 
  ToggleButtonItem,
  CubeToggleProps, 
  CubeToggleState, 
  CubeToggleToggle 
} from './components/Toggle';
export { 
  CHECKBOX_DIMENSIONS, 
  CHECKBOX_COLORS,
  RADIO_DIMENSIONS, 
  RADIO_COLORS,
  SWITCH_DIMENSIONS, 
  SWITCH_COLORS,
  TOGGLE_BUTTON_DIMENSIONS, 
  TOGGLE_BUTTON_COLORS,
  TOGGLE_BUTTON_ANIMATION,
  CUBE_TOGGLE_DIMENSIONS, 
  CUBE_TOGGLE_COLORS
} from './components/Toggle';

