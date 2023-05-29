import { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from 'next-themes';

import Button from '@/components/ui/Button/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/UI/Button',
  component: Button,
  decorators: [(story) => <ThemeProvider>{story()}</ThemeProvider>],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: () => {
    return <Button>Test Button</Button>;
  },
};

export const Outlined: Story = {
  args: {
    outlined: true,
  },
  render: (args) => {
    return <Button {...args}>Test Button</Button>;
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
  render: (args) => {
    return <Button {...args}>Test Button</Button>;
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => {
    return <Button {...args}>Test Button</Button>;
  },
};
