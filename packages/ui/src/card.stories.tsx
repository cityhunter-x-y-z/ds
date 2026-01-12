import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./card";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Card title",
    },
    children: {
      control: "text",
      description: "Card content",
    },
    href: {
      control: "text",
      description: "Link URL",
    },
    className: {
      control: "text",
      description: "CSS class name",
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Documentation",
    children: "Find in-depth information about Next.js features and API.",
    href: "https://nextjs.org/docs",
    className: "",
  },
};

export const Templates: Story = {
  args: {
    title: "Templates",
    children: "Explore starter templates for Next.js.",
    href: "https://vercel.com/templates",
    className: "",
  },
};

export const WithStyling: Story = {
  args: {
    title: "Styled Card",
    children: "This card has custom styling applied.",
    href: "https://example.com",
    className: "p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow",
  },
};
