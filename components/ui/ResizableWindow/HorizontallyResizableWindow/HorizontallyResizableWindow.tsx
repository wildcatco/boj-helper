import ResizableWindow from '@/components/ui/ResizableWindow/ResizableWindow';

interface HorizontallyResizableWindowProps {
  initialLeftRatio?: number;
  children: React.ReactNode;
}

const HorizontallyResizableWindow: React.FC<
  HorizontallyResizableWindowProps
> = ({ initialLeftRatio = 0.5, children }) => {
  return (
    <ResizableWindow
      direction="horizontal"
      firstElementInitialRatio={initialLeftRatio}
    >
      {children}
    </ResizableWindow>
  );
};

export default HorizontallyResizableWindow;
