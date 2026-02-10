import { useDrag, useDrop } from 'react-dnd';
import { GripVertical, X, Maximize2 } from 'lucide-react';
import { Button } from './ui/button';

export interface WidgetProps {
  id: string;
  title: string;
  children: React.ReactNode;
  onRemove?: () => void;
  onMove?: (dragId: string, hoverId: string) => void;
  index: number;
  onExpand?: () => void;
}

const ItemType = 'WIDGET';

export function DraggableWidget({ id, title, children, onRemove, onMove, index, onExpand }: WidgetProps) {
  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemType,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item: { id: string; index: number }) => {
      if (item.id !== id && onMove) {
        onMove(item.id, id);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => preview(drop(node))}
      className={`bg-card rounded-lg border border-border shadow-sm transition-all hover:shadow-md ${
        isDragging ? 'opacity-50 scale-95' : 'opacity-100'
      }`}
      style={{
        animation: 'fadeIn 0.3s ease-in-out',
      }}
    >
      <div className="flex items-center justify-between p-2 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center gap-2">
          <div ref={drag} className="cursor-move text-muted-foreground hover:text-foreground transition-colors">
            <GripVertical className="h-4 w-4" />
          </div>
          <h3 className="font-medium text-sm">{title}</h3>
        </div>
        <div className="flex items-center gap-1">
          {onExpand && (
            <Button variant="ghost" size="sm" onClick={onExpand} className="h-7 w-7 p-0 hover:bg-primary/10">
              <Maximize2 className="h-3 w-3" />
            </Button>
          )}
          {onRemove && (
            <Button variant="ghost" size="sm" onClick={onRemove} className="h-7 w-7 p-0 hover:bg-destructive/10 hover:text-destructive">
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}