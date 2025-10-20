
import React from 'react';
import { Button } from '@siso/ui';
import { Checkbox } from '@siso/ui';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@siso/ui';

interface FilterDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  brands: string[];
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({ isOpen, setIsOpen, brands }) => {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filter Options</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 py-2">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Brand</h4>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox id={`brand-${brand}`} />
                    <label htmlFor={`brand-${brand}`} className="text-sm">
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <Button onClick={() => setIsOpen(false)}>Apply Filters</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterDrawer;
