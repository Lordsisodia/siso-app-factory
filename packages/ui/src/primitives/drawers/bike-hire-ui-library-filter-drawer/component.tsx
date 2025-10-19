import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Label } from '@/components/ui/label';

export interface FilterOption {
  id: string;
  label: string;
  value: string;
  checked?: boolean;
}

export interface FilterGroup {
  id: string;
  title: string;
  options: FilterOption[];
  type?: 'checkbox' | 'radio';
}

export interface FilterDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  filterGroups: FilterGroup[];
  onFilterChange: (groupId: string, optionValue: string, checked: boolean) => void;
  onApply?: () => void;
  onReset?: () => void;
  applyButtonText?: string;
  resetButtonText?: string;
  title?: string;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  setIsOpen,
  filterGroups,
  onFilterChange,
  onApply,
  onReset,
  applyButtonText = 'Apply Filters',
  resetButtonText = 'Reset',
  title = 'Filter Options'
}) => {
  const handleApply = () => {
    if (onApply) {
      onApply();
    }
    setIsOpen(false);
  };

  const handleReset = () => {
    if (onReset) {
      onReset();
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 py-2 max-h-[60vh] overflow-y-auto">
          <div className="space-y-6">
            {filterGroups.map((group) => (
              <div key={group.id}>
                <h4 className="font-medium mb-3">{group.title}</h4>
                <div className="space-y-2">
                  {group.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={option.id}
                        checked={option.checked}
                        onCheckedChange={(checked) =>
                          onFilterChange(group.id, option.value, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={option.id}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <DrawerFooter>
          <div className="flex gap-2 w-full">
            {onReset && (
              <Button variant="outline" onClick={handleReset} className="flex-1">
                {resetButtonText}
              </Button>
            )}
            <Button onClick={handleApply} className="flex-1">
              {applyButtonText}
            </Button>
          </div>
          <DrawerClose asChild>
            <Button variant="ghost" className="w-full">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterDrawer;
