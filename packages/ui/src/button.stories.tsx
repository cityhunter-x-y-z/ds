import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    appName: {
      control: "text",
      description: "The name of the app using the button",
    },
    children: {
      control: "text",
      description: "Button label",
    },
    className: {
      control: "text",
      description: "CSS class name",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Click me",
    appName: "Storybook",
    className: "",
  },
};

export const WithCustomApp: Story = {
  args: {
    children: "Hello World",
    appName: "My Awesome App",
    className: "",
  },
};

export const WithStyling: Story = {
  args: {
    children: "Styled Button",
    appName: "Demo",
    className: "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",
  },
};
