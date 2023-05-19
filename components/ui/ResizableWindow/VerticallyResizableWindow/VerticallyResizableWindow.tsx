import ResizableWindow from '@/components/ui/ResizableWindow/ResizableWindow';

interface VerticallyResizableWindowProps {
  initialTopRatio?: number;
  children: React.ReactNode;
}

const VerticallyResizableWindow: React.FC<VerticallyResizableWindowProps> = ({
  initialTopRatio = 0.5,
  children,
}) => {
  return (
    <ResizableWindow
      direction="vertical"
      firstElementInitialRatio={initialTopRatio}
    >
      {children}
    </ResizableWindow>
  );
};

export default VerticallyResizableWindow;
