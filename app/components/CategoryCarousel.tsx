import { motion } from 'framer-motion';
import { Category } from '../data/categories';

interface CategoryCarouselProps {
  categories: Category[];
}

export default function CategoryCarousel({ categories }: CategoryCarouselProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full overflow-hidden rounded-2xl"
    >
      <div 
        className="flex"
        style={{
          width: '120%',
          animation: 'marquee 60s linear infinite',
        }}
      >
        {[...categories, ...categories].map(({ name, icon: Icon }, index) => (
          <div 
            key={`${name}-${index}`}
            className="flex-shrink-0 bg-[#2A2A3A] p-2 sm:p-3 md:p-4 mx-1 sm:mx-2 rounded-xl text-center hover:bg-[#3A3A4A] transition-colors duration-300 cursor-pointer"
            style={{ width: 'calc(20% - 0.5rem)', minWidth: '80px' }}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-purple-600 rounded-full mx-auto mb-2 flex items-center justify-center">
              <Icon className="text-lg sm:text-xl md:text-2xl" />
            </div>
            <span className="text-xs sm:text-sm font-medium truncate block">{name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}