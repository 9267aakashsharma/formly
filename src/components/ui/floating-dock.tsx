"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import { Button } from "./button";
import { DraggableButton } from "./draggable-button";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
  onClickItem,
}: {
  items: { title: string; icon: React.ReactNode; id: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
  onClickItem?: (id: string) => void;
}) => {
  return (
    <>
      <FloatingDockDesktop
        items={items}
        className={desktopClassName}
        onClickItem={onClickItem}
      />
      <FloatingDockMobile
        items={items}
        className={mobileClassName}
        onClickItem={onClickItem}
      />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
  onClickItem,
}: {
  className?: string;
  onClickItem?: (id: string) => void;
  items: { title: string; icon: React.ReactNode; id: string }[];
}) => {
  const [open, setOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target?.id) {
      onClickItem?.(target.id);
      setOpen(false);
    }
  };

  return (
    <div className={cn("block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
            onClick={handleClick}
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                className="flex items-center justify-center"
              >
                <DraggableButton
                  id={item.id}
                  variant="secondary"
                  title={item.title}
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                >
                  {item.icon}
                </DraggableButton>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <Button
        variant="secondary"
        onClick={() => setOpen((open) => !open)}
        className="w-14 h-14 rounded-full flex items-center justify-center"
      >
        <motion.span
          initial={{ rotate: 0 }}
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex items-center justify-center w-full h-full"
        >
          <Plus size={20} className="!w-5 !h-5 !md:w-6 !md:h-6" />
        </motion.span>
      </Button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
  onClickItem,
}: {
  className?: string;
  onClickItem?: (id: string) => void;
  items: { title: string; icon: React.ReactNode; id: string }[];
}) => {
  const mouseX = useMotionValue(Infinity);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target?.id) {
      onClickItem?.(target.id);
    }
  };

  return (
    <div className={cn("group", className)}>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        onClick={handleClick}
        className={cn(
          "mx-auto hidden h-16 items-end gap-4 rounded-2xl px-4 pb-4 md:flex bg-gray-50/60 dark:bg-neutral-900/60 backdrop-filter backdrop-blur-lg"
        )}
      >
        {items.map((item) => (
          <IconContainer mouseX={mouseX} key={item.title} {...item} />
        ))}
      </motion.div>
      <p className="hidden md:block text-foreground/40 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-75">
        *Click or drag to add items
      </p>
    </div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  id,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  id: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [30, 60, 30]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [30, 60, 30]);

  const widthTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [10, 20, 10]
  );
  const heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [10, 20, 10]
  );

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex aspect-square items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="absolute -top-8 left-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      <DraggableButton
        id={id}
        title={title}
        variant="ghost"
        className="w-full h-full flex items-center justify-center rounded-full hover:bg-transparent"
      >
        <motion.div
          id={id}
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </DraggableButton>
    </motion.div>
  );
}
